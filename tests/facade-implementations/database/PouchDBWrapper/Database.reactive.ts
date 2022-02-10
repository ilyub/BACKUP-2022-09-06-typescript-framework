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
import { handlePromise } from "@skylib/facades/dist/handlePromise";
import { reactiveStorage } from "@skylib/facades/dist/reactiveStorage";
import { uniqueId } from "@skylib/facades/dist/uniqueId";
import * as assert from "@skylib/functions/dist/assertions";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";
import type { Writable } from "@skylib/functions/dist/types/core";

import { handlers } from "@/facade-implementations/database/PouchDBWrapper/Database";
import { PouchNotFoundError } from "@/facade-implementations/database/PouchDBWrapper/errors/PouchNotFoundError";

const errorHandler = jest.spyOn(handlers, "error");

testUtils.installFakeTimer({ shouldAdvanceTime: true });

it.each([false, true])("Database.reactiveCount", async async => {
  await testUtils.run(async () => {
    const config = reactiveStorage<Writable<ReactiveConfig>>({
      conditions: { type: { eq: "a" } },
      updateFn(doc: ExistingDocument): boolean {
        return doc["type"] === "a";
      }
    });

    const db = database.create(uniqueId());

    const result = async
      ? await db.reactiveCountAsync(config)
      : db.reactiveCount(config);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
    }

    {
      expect(result.value).toStrictEqual(0);
      await db.put({ type: "a" });
      await wait(1000);
      expect(result.value).toStrictEqual(1);
    }

    {
      config.conditions = { type: { eq: "b" } };
      expect(result.loading).toBeTrue();
      await wait(1000);
      expect(result.loading).toBeFalse();
      expect(result.value).toStrictEqual(0);
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }

    {
      config.conditions = { type: { eq: "a" } };
      expect(result.loading).toBeFalse();
      await wait(1000);
      expect(result.value).toStrictEqual(0);
    }
  });
});

it.each([false, true])("Database.reactiveCountAttached", async async => {
  await testUtils.run(async () => {
    const config = reactiveStorage<Writable<ReactiveConfigAttached>>({
      conditions: { type: { eq: "a" } },
      updateFn(doc: ExistingAttachedDocument): boolean {
        return doc["type"] === "a";
      }
    });

    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = async
      ? await db.reactiveCountAttachedAsync(config)
      : db.reactiveCountAttached(config);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
    }

    {
      expect(result.value).toStrictEqual(0);
      await db.putAttached(parentId, { type: "a" });
      await wait(1000);
      expect(result.value).toStrictEqual(1);
    }

    {
      config.conditions = { type: { eq: "b" } };
      expect(result.loading).toBeTrue();
      await wait(1000);
      expect(result.loading).toBeFalse();
      expect(result.value).toStrictEqual(0);
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }

    {
      config.conditions = { type: { eq: "a" } };
      expect(result.loading).toBeFalse();
      await wait(1000);
      expect(result.value).toStrictEqual(0);
    }
  });
});

it.each([false, true])("Database.reactiveExists", async async => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const result = async
      ? await db.reactiveExistsAsync(id)
      : db.reactiveExists(id);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
    }

    {
      expect(result.value).toBeFalse();
      await db.put({ _id: id });
      await wait(1000);
      expect(result.value).toBeTrue();
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }
  });
});

it.each([false, true])("Database.reactiveExistsAttached", async async => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = async
      ? await db.reactiveExistsAttachedAsync(0, parentId)
      : db.reactiveExistsAttached(0, parentId);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
    }

    {
      expect(result.value).toBeFalse();
      await db.putAttached(parentId, {});
      await wait(1000);
      expect(result.value).toBeTrue();
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }
  });
});

it.each([false, true])("Database.reactiveGet", async async => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const { rev: rev1 } = await db.put({ _id: id });

    const result = async ? await db.reactiveGetAsync(id) : db.reactiveGet(id);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.value).toStrictEqual({ _id: id, _rev: rev1 });
    }

    const { rev: rev2 } = await db.put({ _id: id, _rev: rev1 });

    {
      await wait(1000);
      expect(result.value).toStrictEqual({ _id: id, _rev: rev2 });
    }

    {
      const error = new PouchNotFoundError("Missing document");

      errorHandler.mockImplementationOnce(() => {});
      await db.put({ _deleted: true, _id: id, _rev: rev2 });
      await wait(1000);
      expect(errorHandler).toBeCalledTimes(1);
      expect(errorHandler).toBeCalledWith(error);
      errorHandler.mockClear();
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }
  });
});

it.each([false, true])("Database.reactiveGetAttached", async async => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const { parentRev: parentRev1 } = await db.putAttached(parentId, {});

    const result = async
      ? await db.reactiveGetAttachedAsync(0, parentId)
      : db.reactiveGetAttached(0, parentId);

    {
      const expected = {
        _id: 0,
        _rev: 1,
        parentDoc: {
          _id: parentId,
          _rev: parentRev1,
          attachedDocs: [],
          lastAttachedDocs: [0]
        }
      };

      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.value).toStrictEqual(expected);
    }

    const { parentRev: parentRev2 } = await db.putAttached(parentId, {
      _id: 0,
      _rev: 1
    });

    {
      const expected = {
        _id: 0,
        _rev: 2,
        parentDoc: {
          _id: parentId,
          _rev: parentRev2,
          attachedDocs: [],
          lastAttachedDocs: [0]
        }
      };

      await wait(1000);
      expect(result.value).toStrictEqual(expected);
    }

    {
      const error = new PouchNotFoundError("Missing attached document");

      errorHandler.mockImplementationOnce(() => {});
      await db.putAttached(parentId, { _deleted: true, _id: 0, _rev: 2 });
      await wait(1000);
      expect(errorHandler).toBeCalledTimes(1);
      expect(errorHandler).toBeCalledWith(error);
      errorHandler.mockClear();
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }
  });
});

it.each([false, true])("Database.reactiveGetAttachedIfExists", async async => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = async
      ? await db.reactiveGetAttachedIfExistsAsync(0, parentId)
      : db.reactiveGetAttachedIfExists(0, parentId);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.value).toBeUndefined();
    }

    const { parentRev } = await db.putAttached(parentId, {});

    {
      const expected = {
        _id: 0,
        _rev: 1,
        parentDoc: {
          _id: parentId,
          _rev: parentRev,
          attachedDocs: [],
          lastAttachedDocs: [0]
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

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }
  });
});

it.each([false, true])("Database.reactiveGetIfExists", async async => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const result = async
      ? await db.reactiveGetIfExistsAsync(id)
      : db.reactiveGetIfExists(id);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.value).toBeUndefined();
    }

    const { rev } = await db.put({ _id: id });

    {
      await wait(1000);
      expect(result.value).toStrictEqual({ _id: id, _rev: rev });
    }

    {
      await db.put({ _deleted: true, _id: id, _rev: rev });
      await wait(1000);
      expect(result.value).toBeUndefined();
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }
  });
});

it.each([false, true])("Database.reactiveQuery", async async => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const config: ReactiveConfig = {
      conditions: { type: { eq: "a" } },
      updateFn(doc) {
        return doc["type"] === "a";
      }
    };

    const result = async
      ? await db.reactiveQueryAsync(config)
      : db.reactiveQuery(config);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.value).toStrictEqual([]);
    }

    {
      const { id, rev } = await db.put({ type: "a" });

      await wait(1000);
      expect(result.value).toStrictEqual([{ _id: id, _rev: rev, type: "a" }]);
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }
  });
});

it.each([false, true])("Database.reactiveQueryAttached", async async => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const config: ReactiveConfigAttached = {
      conditions: { type: { eq: "a" } },
      updateFn(doc) {
        return doc["type"] === "a";
      }
    };

    const result = async
      ? await db.reactiveQueryAttachedAsync(config)
      : db.reactiveQueryAttached(config);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.value).toStrictEqual([]);
    }

    {
      const { parentRev } = await db.putAttached(parentId, {
        type: "a"
      });

      const expected = [
        {
          _id: 0,
          _rev: 1,
          parentDoc: {
            _id: parentId,
            _rev: parentRev,
            attachedDocs: [],
            lastAttachedDocs: [0]
          },
          type: "a"
        }
      ];

      await wait(1000);
      expect(result.value).toStrictEqual(expected);
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }
  });
});

it.each([false, true])("Database.reactiveUnsettled", async async => {
  await testUtils.run(async () => {
    const config: ReactiveConfig = {
      conditions: { d: { dgt: 24.5 * 3600 } },
      updateInterval: 3600 * 1000
    };

    const db = database.create(uniqueId());

    await db.put({ d: datetime.create().toString() });

    const result = async
      ? await db.reactiveUnsettledAsync(config)
      : db.reactiveUnsettled(config);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.value).toStrictEqual(1);
    }

    {
      await wait(2.5 * 3600 * 1000);
      expect(result.value).toStrictEqual(0);
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }
  });
});

it.each([false, true])("Database.reactiveUnsettledAttached", async async => {
  await testUtils.run(async () => {
    const config: ReactiveConfigAttached = {
      conditions: { d: { dgt: 24.5 * 3600 } },
      updateInterval: 3600 * 1000
    };

    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    await db.putAttached(parentId, { d: datetime.create().toString() });

    const result = async
      ? await db.reactiveUnsettledAttachedAsync(config)
      : db.reactiveUnsettledAttached(config);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.value).toStrictEqual(1);
    }

    {
      await wait(2.5 * 3600 * 1000);
      expect(result.value).toStrictEqual(0);
    }

    {
      assert.toBeTrue(result.loaded);
      await result.unsubscribe();
    }
  });
});

it("handlers.error", () => {
  const error = new Error("Sample error");

  expect(() => {
    handlers.error(error);
  }).toThrow(error);
});
