/**
 * @jest-environment @skylib/config/src/jest-env-jsdom
 */
import type {
  ExistingAttachedDocument,
  ExistingDocument,
  ReactiveConfig,
  ReactiveConfigAttached
} from "@skylib/facades/dist/database";
import { database } from "@skylib/facades/dist/database";
import { datetime } from "@skylib/facades/dist/datetime";
import { reactiveStorage } from "@skylib/facades/dist/reactiveStorage";
import { uniqueId } from "@skylib/facades/dist/uniqueId";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";
import type { Writable } from "@skylib/functions/dist/types/core";

import { handlers } from "@/facade-implementations/database/PouchDBWrapper/Database";
import { PouchNotFoundError } from "@/facade-implementations/database/PouchDBWrapper/errors/PouchNotFoundError";

const errorHandler = jest.spyOn(handlers, "error");

testUtils.installFakeTimer({ shouldAdvanceTime: true });

it("Database.reactiveCount", async () => {
  await testUtils.run(async () => {
    const config = reactiveStorage<Writable<ReactiveConfig>>({
      conditions: { type: { eq: "a" } },
      updateFn(doc: ExistingDocument): boolean {
        return doc["type"] === "a";
      }
    });

    const db = database.create(uniqueId());

    const result = await db.reactiveCount(config);

    expect(result.value).toStrictEqual(0);
    await db.put({ type: "a" });
    await wait(1000);
    expect(result.value).toStrictEqual(1);
    config.conditions = { type: { eq: "b" } };
    await wait(1000);
    expect(result.value).toStrictEqual(0);
  });
});

it("Database.reactiveCountAttached", async () => {
  await testUtils.run(async () => {
    const config = reactiveStorage<Writable<ReactiveConfigAttached>>({
      conditions: { type: { eq: "a" } },
      updateFn(doc: ExistingAttachedDocument): boolean {
        return doc["type"] === "a";
      }
    });

    const db = database.create(uniqueId());

    const result = await db.reactiveCountAttached(config);

    const { id: parentId } = await db.put({});

    expect(result.value).toStrictEqual(0);
    await db.putAttached(parentId, { type: "a" });
    await wait(1000);
    expect(result.value).toStrictEqual(1);
    config.conditions = { type: { eq: "b" } };
    await wait(1000);
    expect(result.value).toStrictEqual(0);
  });
});

it("Database.reactiveExists", async () => {
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

it("Database.reactiveExistsAttached", async () => {
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

    if (!unsubscribe) {
      const error = new PouchNotFoundError("Missing document");

      errorHandler.mockImplementationOnce(() => {});
      await db.put({ _deleted: true, _id: id, _rev: rev2 });
      await wait(1000);
      expect(errorHandler).toBeCalledTimes(1);
      expect(errorHandler).toBeCalledWith(error);
      errorHandler.mockClear();
    }
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

    await wait(1000);
    expect(result.value).toStrictEqual(unsubscribe ? expected1 : expected2);

    if (!unsubscribe) {
      const error = new PouchNotFoundError("Missing attached document");

      errorHandler.mockImplementationOnce(() => {});
      await db.putAttached(parentId, { _deleted: true, _id: 0, _rev: 2 });
      await wait(1000);
      expect(errorHandler).toBeCalledTimes(1);
      expect(errorHandler).toBeCalledWith(error);
      errorHandler.mockClear();
    }
  });
});

it("Database.reactiveGetAttachedIfExists", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = await db.reactiveGetAttachedIfExists(0, parentId);

    expect(result.value).toBeUndefined();

    const { parentRev } = await db.putAttached(parentId, {});

    {
      const expected = {
        _id: 0,
        _rev: 1,
        parentDoc: {
          _id: parentId,
          _rev: parentRev,
          attachedDocs: [],
          lastAttachedDoc: 0
        }
      };

      await wait(1000);
      expect(result.value).toStrictEqual(expected);
    }

    {
      await db.putAttached(parentId, { _deleted: true, _id: 0, _rev: 1 });
      await wait(1000);
      expect(result.value).toBeUndefined();
    }
  });
});

it("Database.reactiveGetIfExists", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const result = await db.reactiveGetIfExists(id);

    expect(result.value).toBeUndefined();

    const { rev } = await db.put({ _id: id });

    {
      await wait(1000);
      expect(result.value).toStrictEqual({ _id: id, _rev: rev });
    }

    {
      await db.put({ _deleted: true, _id: id, _rev: rev, z: 1 });
      await wait(1000);
      expect(result.value).toBeUndefined();
    }
  });
});

it("Database.reactiveQuery", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const result = await db.reactiveQuery(
      reactiveStorage<ReactiveConfig>({
        conditions: { type: { eq: "a" } },
        updateFn(doc) {
          return doc["type"] === "a";
        }
      })
    );

    expect(result.value).toStrictEqual([]);

    const { id, rev } = await db.put({ type: "a" });

    await wait(1000);
    expect(result.value).toStrictEqual([{ _id: id, _rev: rev, type: "a" }]);
  });
});

it("Database.reactiveQueryAttached", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = await db.reactiveQueryAttached(
      reactiveStorage<ReactiveConfigAttached>({
        conditions: { type: { eq: "a" } },
        updateFn(doc) {
          return doc["type"] === "a";
        }
      })
    );

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

it("Database.reactiveUnsettled", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    await db.put({ d: datetime.create().toString() });

    const result = await db.reactiveUnsettled(
      reactiveStorage<ReactiveConfig>({
        conditions: { d: { dgt: 24.5 * 3600 } },
        updateInterval: 3600 * 1000
      })
    );

    expect(result.value).toStrictEqual(1);
    await wait(2.5 * 3600 * 1000);
    expect(result.value).toStrictEqual(0);
    await result.unsubscribe();
  });
});

it("Database.reactiveUnsettledAttached", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    await db.putAttached(parentId, { d: datetime.create().toString() });

    const result = await db.reactiveUnsettledAttached(
      reactiveStorage<ReactiveConfigAttached>({
        conditions: { d: { dgt: 24.5 * 3600 } },
        updateInterval: 3600 * 1000
      })
    );

    expect(result.value).toStrictEqual(1);
    await wait(2.5 * 3600 * 1000);
    expect(result.value).toStrictEqual(0);
    await result.unsubscribe();
  });
});

it("handlers.error", () => {
  const error = new Error("Sample error");

  expect(() => {
    handlers.error(error);
  }).toThrow(error);
});
