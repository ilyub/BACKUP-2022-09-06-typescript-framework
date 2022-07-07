import { implementations } from "@";
import {
  PouchConflictError,
  PouchRetryError
} from "@/facade-implementations/database/pouchdb-wrapper/core/errors";
import { uniqueId } from "@skylib/facades";
import { a } from "@skylib/functions";
import type { database } from "@skylib/facades";

const pouchdb = new implementations.database.PouchWrapper();

test("put", async () => {
  const db = pouchdb.create(uniqueId());

  const response1 = await db.put({});

  expect(response1).toContainAllKeys(["id", "rev"]);
  expect(response1.rev).toStartWith("1-");

  const response2 = await db.put({ _id: response1.id, _rev: response1.rev });

  expect(response2).toContainAllKeys(["id", "rev"]);
  expect(response2.rev).toStartWith("2-");

  const error = new PouchConflictError("Document update conflict");

  await expect(db.put({ _id: response2.id })).rejects.toStrictEqual(error);
});

test("put: Invalid attached document", async () => {
  const db = pouchdb.create(uniqueId());

  const doc: database.PutDocument = { attachedDocs: [{ _id: 2, _rev: 1 }] };

  const error = new Error("Invalid attached document");

  await expect(db.put(doc)).rejects.toStrictEqual(error);
});

test("put: attached", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  const { rev: rev1 } = await db.put({
    _id: id,
    attachedDocs: [{ _id: 0, _rev: 1 }]
  });

  const doc = await db.get(id);

  const { rev: rev2 } = await db.put({ ...doc, _rev: rev1 });

  const expected = {
    _id: id,
    _rev: rev2,
    attachedDocs: []
  } as const;

  const expectedAttached = {
    _id: 0,
    _rev: 1,
    parentDoc: {
      _id: id,
      _rev: rev2,
      attachedDocs: []
    }
  } as const;

  await expect(db.get(id)).resolves.toStrictEqual(expected);
  await expect(db.getAttached(0, id)).resolves.toStrictEqual(expectedAttached);
});

test("put: null", async () => {
  const db = pouchdb.create(uniqueId());

  const { id, rev } = await db.put({ x: null });

  await expect(db.get(id)).resolves.toStrictEqual({
    _id: id,
    _rev: rev,
    x: null
  });
});

test.each(["_attachments", "_conflicts", "filters", "views"])(
  "put: reserved",
  async key => {
    const db = pouchdb.create(uniqueId());

    const error = new Error(`Put document includes reserved key: ${key}`);

    await expect(db.put({ [key]: 1 })).rejects.toStrictEqual(error);
  }
);

test("put: undefined", async () => {
  const db = pouchdb.create(uniqueId());

  const { id, rev } = await db.put({ x: undefined });

  await expect(db.get(id)).resolves.toStrictEqual({ _id: id, _rev: rev });
});

test("putAttached", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id });

  const response1 = await db.putAttached(id, {});

  expect(response1).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response1.id).toBe(0);
  expect(response1.rev).toBe(1);

  const response2 = await db.putAttached(id, { _id: 0, _rev: 1 });

  expect(response2).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response2.id).toBe(0);
  expect(response2.rev).toBe(2);

  const error = new PouchConflictError("Document update conflict");

  await expect(db.putAttached(id, { _id: 0 })).rejects.toStrictEqual(error);
});

test("putAttachedBulk", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id, x: 1 });

  const responses = await db.putAttachedBulk(id, [{ y: 1 }, { y: 2 }]);

  const { parentId: id1, parentRev: rev1 } = a.first(responses);

  const { parentId: id2, parentRev: rev2 } = a.second(responses);

  const doc1 = await db.getAttached(0, id1);

  const doc2 = await db.getAttached(1, id2);

  const expectedResponses = [
    {
      id: 0,
      parentId: id1,
      parentRev: rev1,
      rev: 1
    },
    {
      id: 1,
      parentId: id2,
      parentRev: rev2,
      rev: 1
    }
  ] as const;

  const expected1 = {
    _id: 0,
    _rev: 1,
    parentDoc: {
      _id: id1,
      _rev: rev1,
      attachedDocs: [],
      lastAttachedDocs: [0, 1],
      x: 1
    },
    y: 1
  } as const;

  const expected2 = {
    _id: 1,
    _rev: 1,
    parentDoc: {
      _id: id2,
      _rev: rev2,
      attachedDocs: [],
      lastAttachedDocs: [0, 1],
      x: 1
    },
    y: 2
  } as const;

  expect(responses).toStrictEqual(expectedResponses);
  expect(doc1).toStrictEqual(expected1);
  expect(doc2).toStrictEqual(expected2);
});

test("putAttachedBulk: PouchRetryError", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id });
  await expect(
    Promise.all([db.putAttachedBulk(id, [{}]), db.putAttachedBulk(id, [{}])])
  ).rejects.toStrictEqual(new PouchRetryError("Failed after 0 retries"));
});
