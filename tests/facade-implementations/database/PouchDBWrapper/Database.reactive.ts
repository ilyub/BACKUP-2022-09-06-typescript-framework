/**
 * @jest-environment @skylib/config/src/jest-env-jsdom
 */
import { database } from "@skylib/facades/dist/database";
import { datetime } from "@skylib/facades/dist/datetime";
import { uniqueId } from "@skylib/facades/dist/uniqueId";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";

testUtils.installFakeTimer({ shouldAdvanceTime: true });

it("reactiveCount", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const result = await db.reactiveCount({
      conditions: { type: { eq: "a" } },
      updateFn(doc) {
        return doc["type"] === "a";
      }
    });

    expect(result.value).toStrictEqual(0);
    await db.put({ type: "a" });
    await wait(1000);
    expect(result.value).toStrictEqual(1);
  });
});

it("reactiveCountAttached", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = await db.reactiveCountAttached({
      conditions: { type: { eq: "a" } },
      updateFn(doc) {
        return doc["type"] === "a";
      }
    });

    expect(result.value).toStrictEqual(0);
    await db.putAttached(parentId, { type: "a" });
    await wait(1000);
    expect(result.value).toStrictEqual(1);
  });
});

it("reactiveExists", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const result = await db.reactiveExists(id);

    expect(result.value).toBeFalse();
    await db.put({ _id: id });
    await wait(1000);
    expect(result.value).toBeTrue();
  });
});

it("reactiveExistsAttached", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = await db.reactiveExistsAttached(0, parentId);

    expect(result.value).toBeFalse();
    await db.putAttached(parentId, {});
    await wait(1000);
    expect(result.value).toBeTrue();
  });
});

it.each([false, true])("reactiveGet", async unsubscribe => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const { rev: rev1 } = await db.put({ _id: id, value: 1 });

    const result = await db.reactiveGet(id);

    const expected1 = { _id: id, _rev: rev1, value: 1 };

    expect(result.value).toStrictEqual(expected1);

    if (unsubscribe) await result.unsubscribe();

    const { rev: rev2 } = await db.put({ _id: id, _rev: rev1, value: 2 });

    const expected2 = { _id: id, _rev: rev2, value: 2 };

    await wait(1000);
    expect(result.value).toStrictEqual(unsubscribe ? expected1 : expected2);
  });
});

it.each([false, true])("reactiveGetAttached", async unsubscribe => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const { parentRev: parentRev1 } = await db.putAttached(parentId, {
      value: 1
    });

    const result = await db.reactiveGetAttached(0, parentId);

    const expected1 = {
      _id: 0,
      _rev: 1,
      parentDoc: {
        _id: parentId,
        _rev: parentRev1,
        attachedDocs: [],
        lastAttachedDoc: 0
      },
      value: 1
    };

    expect(result.value).toStrictEqual(expected1);

    if (unsubscribe) await result.unsubscribe();

    const { parentRev: parentRev2 } = await db.putAttached(parentId, {
      _id: 0,
      _rev: 1,
      value: 2
    });

    await wait(1000);

    const expected2 = {
      _id: 0,
      _rev: 2,
      parentDoc: {
        _id: parentId,
        _rev: parentRev2,
        attachedDocs: [],
        lastAttachedDoc: 0
      },
      value: 2
    };

    expect(result.value).toStrictEqual(unsubscribe ? expected1 : expected2);
  });
});

it("reactiveGetAttachedIfExists", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = await db.reactiveGetAttachedIfExists(0, parentId);

    expect(result.value).toBeUndefined();

    const { parentRev } = await db.putAttached(parentId, {});

    await wait(1000);

    expect(result.value).toStrictEqual({
      _id: 0,
      _rev: 1,
      parentDoc: {
        _id: parentId,
        _rev: parentRev,
        attachedDocs: [],
        lastAttachedDoc: 0
      }
    });
  });
});

it("reactiveGetIfExists", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const result = await db.reactiveGetIfExists(id);

    expect(result.value).toBeUndefined();

    const { rev } = await db.put({ _id: id });

    await wait(1000);
    expect(result.value).toStrictEqual({ _id: id, _rev: rev });
  });
});

it("reactiveQuery", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const result = await db.reactiveQuery({
      conditions: { type: { eq: "a" } },
      updateFn(doc) {
        return doc["type"] === "a";
      }
    });

    expect(result.value).toStrictEqual([]);

    const { id, rev } = await db.put({ type: "a" });

    await wait(1000);
    expect(result.value).toStrictEqual([{ _id: id, _rev: rev, type: "a" }]);
  });
});

it("reactiveQueryAttached", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = await db.reactiveQueryAttached({
      conditions: { type: { eq: "a" } },
      updateFn(doc) {
        return doc["type"] === "a";
      }
    });

    expect(result.value).toStrictEqual([]);

    const { parentRev } = await db.putAttached(parentId, { type: "a" });

    await wait(1000);

    expect(result.value).toStrictEqual([
      {
        _id: 0,
        _rev: 1,
        parentDoc: {
          _id: parentId,
          _rev: parentRev,
          attachedDocs: [],
          lastAttachedDoc: 0
        },
        type: "a"
      }
    ]);
  });
});

it("reactiveUnsettled", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    await db.put({ d: datetime.create().toString() });

    const result = await db.reactiveUnsettled({
      conditions: { d: { dgt: 24.5 * 3600 } },
      updateInterval: 3600 * 1000
    });

    expect(result.value).toStrictEqual(1);
    await wait(2.5 * 3600 * 1000);
    expect(result.value).toStrictEqual(0);
    await result.unsubscribe();
  });
});

it("reactiveUnsettledAttached", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    await db.putAttached(parentId, { d: datetime.create().toString() });

    const result = await db.reactiveUnsettledAttached({
      conditions: { d: { dgt: 24.5 * 3600 } },
      updateInterval: 3600 * 1000
    });

    expect(result.value).toStrictEqual(1);
    await wait(2.5 * 3600 * 1000);
    expect(result.value).toStrictEqual(0);
    await result.unsubscribe();
  });
});
