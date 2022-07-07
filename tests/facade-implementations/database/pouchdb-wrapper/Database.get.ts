import { implementations } from "@";
import { PouchNotFoundError } from "@/facade-implementations/database/pouchdb-wrapper/core/errors";
import { database, handlePromise, uniqueId } from "@skylib/facades";
import { fn, wait } from "@skylib/functions";
import * as testUtils from "@skylib/functions/dist/test-utils";

const pouchdb = new implementations.database.PouchWrapper();

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("get", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  const { rev } = await db.put({ _id: id, x: 1 });

  await expect(db.get(id)).resolves.toStrictEqual({
    _id: id,
    _rev: rev,
    x: 1
  });
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

test("get: deleted", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  const error = new PouchNotFoundError("missing");

  await db.put({ _deleted: true, _id: id });
  await expect(db.get(id)).rejects.toStrictEqual(error);
});

test("get: missing", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  const error = new PouchNotFoundError("missing");

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

test("getAttached: deleted", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  const error = new PouchNotFoundError("Missing attached document");

  await db.put({ _id: id });
  await db.putAttached(id, { _deleted: true });
  await expect(db.getAttached(0, id)).rejects.toStrictEqual(error);
});

test("getAttached: missing", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  const error1 = new PouchNotFoundError("missing");

  const error2 = new PouchNotFoundError("Missing attached document");

  await expect(db.getAttached(0, id)).rejects.toStrictEqual(error1);
  await db.put({ _id: id });
  await expect(db.getAttached(0, id)).rejects.toStrictEqual(error2);
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
    await handlePromise.runAll();
    expect(result.loaded).toBeTrue();
    expect(result.value).toStrictEqual(expected1);

    const { rev: rev2 } = await db.put({ _id: id, _rev: rev1 });

    const expected2 = { _id: id, _rev: rev2 } as const;

    await wait(1000);
    expect(result.value).toStrictEqual(expected2);
    result.unsubscribe();
    await db.put({ _id: id, _rev: rev2 });
    await wait(1000);
    expect(result.value).toStrictEqual(expected2);
  });
});

test("reactiveGet: PouchNotFoundError", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const id = uniqueId();

    const { rev } = await db.put({ _id: id });

    const doc: database.PutDocument = {
      _deleted: true,
      _id: id,
      _rev: rev
    };

    const errorSpy = jest.spyOn(console, "error");

    const args = [
      'Error in .on("change", function):',
      new implementations.database.PouchWrapper.PouchNotFoundError(
        "Missing document"
      )
    ] as const;

    db.reactiveGet(id);
    await db.put(doc);
    errorSpy.mockImplementationOnce(fn.noop);
    await wait(1000);
    expect(errorSpy).mockCallsToBe(args);
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
    await handlePromise.runAll();
    expect(result.loaded).toBeTrue();
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

    await wait(1000);
    expect(result.value).toStrictEqual(expected2);
    result.unsubscribe();
    await db.putAttached(id, { _id: 0, _rev: 2 });
    await wait(1000);
    expect(result.value).toStrictEqual(expected2);
  });
});

test("reactiveGetAttached: PouchNotFoundError", async () => {
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

    const errorSpy = jest.spyOn(console, "error");

    const args = [
      'Error in .on("change", function):',
      new implementations.database.PouchWrapper.PouchNotFoundError(
        "Missing attached document"
      )
    ] as const;

    db.reactiveGetAttached(0, id);
    await db.putAttached(id, doc);
    errorSpy.mockImplementationOnce(fn.noop);
    await wait(1000);
    expect(errorSpy).mockCallsToBe(args);
  });
});
