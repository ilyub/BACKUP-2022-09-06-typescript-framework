/* eslint jest/max-expects: [warn, { max: 7 }] -- Ok */

import { a } from "@skylib/functions";
import type { database } from "@skylib/facades";
import { implementations } from "@";
import { uniqueId } from "@skylib/facades";

const { PouchConflictError, PouchRetryError } =
  implementations.database.PouchWrapper;

const pouchdb = new implementations.database.PouchWrapper();

test("put", async () => {
  const db = pouchdb.create(uniqueId());

  const { id, rev: rev1 } = await db.put({});

  expect(rev1).toStartWith("1-");

  const doc: database.PutDocument = { _id: id, _rev: rev1 };

  const { rev: rev2 } = await db.put(doc);

  const error = new PouchConflictError("Document update conflict");

  expect(rev2).toStartWith("2-");
  await expect(db.put(doc)).rejects.toStrictEqual(error);
});

test("put: Invalid attached document", async () => {
  const db = pouchdb.create(uniqueId());

  const doc: database.PutDocument = { attachedDocs: [{ _id: 2, _rev: 1 }] };

  const error = new Error("Invalid attached document");

  await expect(db.put(doc)).rejects.toStrictEqual(error);
});

test.each([
  async (doc: database.PutDocument, db: database.Database) => await db.put(doc),
  async (doc: database.PutDocument, db: database.Database) => {
    const { id, rev } = await db.put(doc);

    const doc2 = await db.get(id);

    return await db.put({ ...doc2, _rev: rev });
  }
])("put: attached", async subtest => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  const doc: database.PutDocument = {
    _id: id,
    attachedDocs: [{ _id: 0, _rev: 1 }]
  };

  const { rev } = await subtest(doc, db);

  const expected = { _id: id, _rev: rev, attachedDocs: [] } as const;

  const expectedAttached = {
    _id: 0,
    _rev: 1,
    parentDoc: { _id: id, _rev: rev, attachedDocs: [] }
  } as const;

  await expect(db.get(id)).resolves.toStrictEqual(expected);
  await expect(db.getAttached(0, id)).resolves.toStrictEqual(expectedAttached);
});

test("put: null", async () => {
  const db = pouchdb.create(uniqueId());

  const { id, rev } = await db.put({ x: null });

  const expected = { _id: id, _rev: rev, x: null } as const;

  await expect(db.get(id)).resolves.toStrictEqual(expected);
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

  const expected = { _id: id, _rev: rev } as const;

  await expect(db.get(id)).resolves.toStrictEqual(expected);
});

test("putAttached", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id });

  const response1 = await db.putAttached(id, {});

  expect(response1).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response1.id).toBe(0);
  expect(response1.rev).toBe(1);

  const doc: database.PutAttachedDocument = { _id: 0, _rev: 1 };

  const response2 = await db.putAttached(id, doc);

  const error = new PouchConflictError("Document update conflict");

  expect(response2).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response2.id).toBe(0);
  expect(response2.rev).toBe(2);
  await expect(db.putAttached(id, doc)).rejects.toStrictEqual(error);
});

test("putAttachedBulk", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id, x: 1 });

  const responses = await db.putAttachedBulk(id, [{ y: 1 }, { y: 2 }]);

  const { parentId: id1, parentRev: rev1 } = a.first(responses);

  const { parentId: id2, parentRev: rev2 } = a.second(responses);

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

  await expect(db.getAttached(0, id1)).resolves.toStrictEqual(expected1);
  await expect(db.getAttached(1, id2)).resolves.toStrictEqual(expected2);
});

test("putAttachedBulk: PouchRetryError", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id });
  await expect(
    Promise.all([db.putAttachedBulk(id, [{}]), db.putAttachedBulk(id, [{}])])
  ).rejects.toStrictEqual(new PouchRetryError("Failed after 0 retries"));
});
