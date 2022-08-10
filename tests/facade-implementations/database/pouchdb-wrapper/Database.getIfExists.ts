/* eslint jest/max-expects: [warn, { max: 13 }] -- Ok */

import * as testUtils from "@skylib/functions/dist/test-utils";
import { fn, wait } from "@skylib/functions";
import { handlePromise, uniqueId } from "@skylib/facades";
import type { database } from "@skylib/facades";
import { implementations } from "@";

const pouchdb = new implementations.database.PouchWrapper();

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("getIfExists", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  const { rev } = await db.put({ _id: id, x: 1 });

  await expect(db.getIfExists(id)).resolves.toStrictEqual({
    _id: id,
    _rev: rev,
    x: 1
  });
});

test("getIfExists: attachedDocs", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id, x: 1 });

  const { parentRev: rev } = await db.putAttached(id, {});

  await expect(db.getIfExists(id)).resolves.toStrictEqual({
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
])("getIfExists: missing", async subtest => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await subtest(id, db);
  await expect(db.getIfExists(id)).resolves.toBeUndefined();
});

test("getIfExistsAttached", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id, x: 1 });

  const { parentRev: rev } = await db.putAttached(id, { y: 2 });

  await expect(db.getIfExistsAttached(0, id)).resolves.toStrictEqual({
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
  fn.noop,
  async (id: string, db: database.Database) => {
    await db.put({ _id: id });
  },
  async (id: string, db: database.Database) => {
    await db.put({ _id: id });
    await db.putAttached(id, { _deleted: true });
  }
])("getIfExistsAttached: missing", async subtest => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await subtest(id, db);
  await expect(db.getIfExistsAttached(0, id)).resolves.toBeUndefined();
});

test("reactiveGetIfExists", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const id = uniqueId();

    const result = db.reactiveGetIfExists(id);

    expect(result.loaded).toBeFalse();
    expect(result.loading).toBeTrue();
    await handlePromise.runAll();
    expect(result.loaded).toBeTrue();
    expect(result.loading).toBeFalse();
    expect(result.value).toBeUndefined();

    const { rev } = await db.put({ _id: id, x: 1 });

    const expected = { _id: id, _rev: rev, x: 1 } as const;

    {
      await wait(1000);
      expect(result.value).toStrictEqual(expected);
    }

    {
      await db.put({ _deleted: true, _id: id, _rev: rev });
      await wait(1000);
      expect(result.value).toBeUndefined();
    }
  });
});

test("reactiveGetIfExistsAttached", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const id = uniqueId();

    await db.put({ _id: id, x: 1 });

    const result = db.reactiveGetIfExistsAttached(0, id);

    expect(result.loaded).toBeFalse();
    expect(result.loading).toBeTrue();
    await handlePromise.runAll();
    expect(result.loaded).toBeTrue();
    expect(result.loading).toBeFalse();
    expect(result.value).toBeUndefined();

    const { parentRev: rev } = await db.putAttached(id, { y: 2 });

    const expected = {
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
    } as const;

    {
      await wait(1000);
      expect(result.value).toStrictEqual(expected);
    }

    {
      await db.putAttached(id, { _deleted: true, _id: 0, _rev: 1 });
      await wait(1000);
      expect(result.value).toBeUndefined();
    }
  });
});
