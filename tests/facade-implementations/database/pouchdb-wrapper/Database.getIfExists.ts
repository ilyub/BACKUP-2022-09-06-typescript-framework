/* eslint-disable @skylib/consistent-filename -- Ok */

import { implementations } from "@";
import { handlePromise, uniqueId } from "@skylib/facades";
import { assert, wait } from "@skylib/functions";
import * as testUtils from "@skylib/functions/dist/test-utils";
import type { database } from "@skylib/facades";

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

test("getIfExists: deleted", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _deleted: true, _id: id });
  await expect(db.getIfExists(id)).resolves.toBeUndefined();
});

test("getIfExists: missing", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

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

test("getIfExistsAttached: deleted", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id });
  await db.putAttached(id, { _deleted: true });
  await expect(db.getIfExistsAttached(0, id)).resolves.toBeUndefined();
});

test("getIfExistsAttached: missing", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await expect(db.getIfExistsAttached(0, id)).resolves.toBeUndefined();
  await db.put({ _id: id });
  await expect(db.getIfExistsAttached(0, id)).resolves.toBeUndefined();
});

test("reactiveGetIfExists", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const id = uniqueId();

    const result = db.reactiveGetIfExists(id);

    expect(result.loaded).toBeFalse();
    await handlePromise.runAll();
    assert.toBeTrue(result.loaded);
    expect(result.value).toBeUndefined();

    const { rev } = await db.put({ _id: id, x: 1 });

    const expected = {
      _id: id,
      _rev: rev,
      x: 1
    };

    await wait(1000);
    expect(result.value).toStrictEqual(expected);

    const doc: database.PutDocument = {
      _deleted: true,
      _id: id,
      _rev: rev
    };

    await db.put(doc);
    await wait(1000);
    expect(result.value).toBeUndefined();
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
    await handlePromise.runAll();
    assert.toBeTrue(result.loaded);
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
    };

    await wait(1000);
    expect(result.value).toStrictEqual(expected);

    const doc: database.PutAttachedDocument = {
      _deleted: true,
      _id: 0,
      _rev: 1
    };

    await db.putAttached(id, doc);
    await wait(1000);
    expect(result.value).toBeUndefined();
  });
});
