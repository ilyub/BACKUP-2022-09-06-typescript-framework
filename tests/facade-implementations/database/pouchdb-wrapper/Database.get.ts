/* eslint jest/max-expects: [warn, { max: 12 }] -- Ok */

import * as testUtils from "@skylib/functions/dist/test-utils";
import { database, handlePromise, uniqueId } from "@skylib/facades";
import { fn, wait } from "@skylib/functions";
import { implementations } from "@";

const { PouchNotFoundError } = implementations.database.PouchWrapper;

const pouchdb = new implementations.database.PouchWrapper();

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("get", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  const { rev } = await db.put({ _id: id, x: 1 });

  await expect(db.get(id)).resolves.toStrictEqual({ _id: id, _rev: rev, x: 1 });
});

test("get: attachedDocs", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id, x: 1 });

  const { parentRev: rev } = await db.putAttached(id, {});

  await expect(db.get(id)).resolves.toStrictEqual({
    _id: id,
    _rev: rev,
    attachedDocs: [],
    lastAttachedDocs: [0],
    x: 1
  });
});

test.each([
  fn.noop,
  async (id: string, db: database.Database) => {
    await db.put({ _deleted: true, _id: id });
  }
])("get: missing", async subtest => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  const error = new PouchNotFoundError("missing");

  await subtest(id, db);
  await expect(db.get(id)).rejects.toStrictEqual(error);
});

test("getAttached", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id, x: 1 });

  const { parentRev: rev } = await db.putAttached(id, { y: 2 });

  await expect(db.getAttached(0, id)).resolves.toStrictEqual({
    _id: 0,
    _rev: 1,
    parentDoc: {
      _id: id,
      _rev: rev,
      attachedDocs: [],
      lastAttachedDocs: [0],
      x: 1
    },
    y: 2
  });
});

test.each([
  { error: new PouchNotFoundError("missing"), subtest: fn.noop },
  {
    error: new PouchNotFoundError("Missing attached document"),
    subtest: async (id: string, db: database.Database) => {
      await db.put({ _id: id });
    }
  },
  {
    error: new PouchNotFoundError("Missing attached document"),
    subtest: async (id: string, db: database.Database) => {
      await db.put({ _id: id });
      await db.putAttached(id, { _deleted: true });
    }
  }
])("getAttached: missing", async ({ error, subtest }) => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await subtest(id, db);
  await expect(db.getAttached(0, id)).rejects.toStrictEqual(error);
});

test("reactiveGet", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const id = uniqueId();

    const { rev: rev1 } = await db.put({ _id: id });

    const result = db.reactiveGet(id);

    const expected1 = { _id: id, _rev: rev1 } as const;

    expect(result.loaded).toBeFalse();
    expect(result.loading).toBeTrue();
    expect(result.value).toBeUndefined();
    await handlePromise.runAll();
    expect(result.loaded).toBeTrue();
    expect(result.loading).toBeFalse();
    expect(result.value).toStrictEqual(expected1);

    const { rev: rev2 } = await db.put({ _id: id, _rev: rev1 });

    const expected2 = { _id: id, _rev: rev2 } as const;

    {
      await wait(1000);
      expect(result.value).toStrictEqual(expected2);
    }

    {
      result.unsubscribe();
      await db.put({ _id: id, _rev: rev2 });
      expect(result.loading).toBeFalse();
      await wait(1000);
      expect(result.value).toStrictEqual(expected2);
    }
  });
});

test("reactiveGet: missing", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const id = uniqueId();

    const { rev } = await db.put({ _id: id });

    const doc: database.PutDocument = { _deleted: true, _id: id, _rev: rev };

    const errorFn = jest.spyOn(console, "error");

    const expected = [
      'Error in .on("change", function):',
      new implementations.database.PouchWrapper.PouchNotFoundError(
        "Missing document"
      )
    ] as const;

    db.reactiveGet(id);
    await db.put(doc);
    errorFn.mockImplementationOnce(fn.noop);
    await wait(1000);
    expect(errorFn).mockCallsToBe(expected);
  });
});

test("reactiveGetAttached", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    await db.put({ _id: id });

    const { parentRev: rev1 } = await db.putAttached(id, {});

    const result = db.reactiveGetAttached(0, id);

    const expected1 = {
      _id: 0,
      _rev: 1,
      parentDoc: {
        _id: id,
        _rev: rev1,
        attachedDocs: [],
        lastAttachedDocs: [0]
      }
    } as const;

    expect(result.loaded).toBeFalse();
    expect(result.loading).toBeTrue();
    expect(result.value).toBeUndefined();
    await handlePromise.runAll();
    expect(result.loaded).toBeTrue();
    expect(result.loading).toBeFalse();
    expect(result.value).toStrictEqual(expected1);

    const { parentRev: rev2 } = await db.putAttached(id, { _id: 0, _rev: 1 });

    const expected2 = {
      _id: 0,
      _rev: 2,
      parentDoc: {
        _id: id,
        _rev: rev2,
        attachedDocs: [],
        lastAttachedDocs: [0]
      }
    } as const;

    {
      await wait(1000);
      expect(result.value).toStrictEqual(expected2);
    }

    {
      result.unsubscribe();
      await db.putAttached(id, { _id: 0, _rev: 2 });
      expect(result.loading).toBeFalse();
      await wait(1000);
      expect(result.value).toStrictEqual(expected2);
    }
  });
});

test("reactiveGetAttached: missing", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    await db.put({ _id: id });
    await db.putAttached(id, {});

    const doc: database.PutAttachedDocument = {
      _deleted: true,
      _id: 0,
      _rev: 1
    };

    const errorFn = jest.spyOn(console, "error");

    const expected = [
      'Error in .on("change", function):',
      new implementations.database.PouchWrapper.PouchNotFoundError(
        "Missing attached document"
      )
    ] as const;

    db.reactiveGetAttached(0, id);
    await db.putAttached(id, doc);
    errorFn.mockImplementationOnce(fn.noop);
    await wait(1000);
    expect(errorFn).mockCallsToBe(expected);
  });
});
