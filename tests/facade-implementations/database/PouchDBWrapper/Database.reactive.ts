/* eslint-disable jest/no-conditional-in-test */

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
import * as fn from "@skylib/functions/dist/function";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";
import type { Writable } from "@skylib/functions/dist/types/core";

import { handlers } from "@/facade-implementations/database/PouchDBWrapper/Database";
import { PouchNotFoundError } from "@/facade-implementations/database/PouchDBWrapper/errors/PouchNotFoundError";

const errorHandler = jest.spyOn(handlers, "error");

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test.each([false, true])("database.reactiveCount", async async => {
  expect.hasAssertions();

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
      assert.toBeTrue(result.loaded);
    }

    {
      expect(result.value).toBe(0);
      await db.put({ type: "a" });
      await wait(1000);
      expect(result.value).toBe(1);
    }

    {
      config.conditions = { type: { eq: "b" } };
      expect(result.loading).toBeTrue();
      await wait(1000);
      expect(result.loading).toBeFalse();
      expect(result.value).toBe(0);
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }

    {
      config.conditions = { type: { eq: "a" } };
      expect(result.loading).toBeFalse();
      await wait(1000);
      expect(result.value).toBe(0);
    }
  });
});

test.each([false, true])("database.reactiveCountAttached", async async => {
  expect.hasAssertions();

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
      assert.toBeTrue(result.loaded);
    }

    {
      expect(result.value).toBe(0);
      await db.putAttached(parentId, { type: "a" });
      await wait(1000);
      expect(result.value).toBe(1);
    }

    {
      config.conditions = { type: { eq: "b" } };
      expect(result.loading).toBeTrue();
      await wait(1000);
      expect(result.loading).toBeFalse();
      expect(result.value).toBe(0);
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }

    {
      config.conditions = { type: { eq: "a" } };
      expect(result.loading).toBeFalse();
      await wait(1000);
      expect(result.value).toBe(0);
    }
  });
});

test.each([false, true])("database.reactiveExists", async async => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const result = async
      ? await db.reactiveExistsAsync(id)
      : db.reactiveExists(id);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      assert.toBeTrue(result.loaded);
    }

    {
      expect(result.value).toBeFalse();
      await db.put({ _id: id });
      await wait(1000);
      expect(result.value).toBeTrue();
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test.each([false, true])("database.reactiveExistsAttached", async async => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = async
      ? await db.reactiveExistsAttachedAsync(0, parentId)
      : db.reactiveExistsAttached(0, parentId);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      assert.toBeTrue(result.loaded);
    }

    {
      expect(result.value).toBeFalse();
      await db.putAttached(parentId, {});
      await wait(1000);
      expect(result.value).toBeTrue();
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test.each([false, true])("database.reactiveGet", async async => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const { rev: rev1 } = await db.put({ _id: id });

    const result = async ? await db.reactiveGetAsync(id) : db.reactiveGet(id);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      assert.toBeTrue(result.loaded);
      expect(result.value).toStrictEqual({ _id: id, _rev: rev1 });
    }

    const { rev: rev2 } = await db.put({ _id: id, _rev: rev1 });

    {
      await wait(1000);
      expect(result.value).toStrictEqual({ _id: id, _rev: rev2 });
    }

    {
      const error = new PouchNotFoundError("Missing document");

      errorHandler.mockImplementationOnce(fn.noop);
      await db.put({ _deleted: true, _id: id, _rev: rev2 });
      await wait(1000);
      expect(errorHandler).toHaveBeenCalledTimes(1);
      expect(errorHandler).toHaveBeenCalledWith(error);
      errorHandler.mockClear();
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test.each([false, true])("database.reactiveGetAttached", async async => {
  expect.hasAssertions();

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
      assert.toBeTrue(result.loaded);
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

      errorHandler.mockImplementationOnce(fn.noop);
      await db.putAttached(parentId, { _deleted: true, _id: 0, _rev: 2 });
      await wait(1000);
      expect(errorHandler).toHaveBeenCalledTimes(1);
      expect(errorHandler).toHaveBeenCalledWith(error);
      errorHandler.mockClear();
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test.each([false, true])(
  "database.reactiveGetAttachedIfExists",
  async async => {
    expect.hasAssertions();

    await testUtils.run(async () => {
      const db = database.create(uniqueId());

      const { id: parentId } = await db.put({});

      const result = async
        ? await db.reactiveGetAttachedIfExistsAsync(0, parentId)
        : db.reactiveGetAttachedIfExists(0, parentId);

      {
        expect(result.loaded).toStrictEqual(async);
        await handlePromise.runAll();
        assert.toBeTrue(result.loaded);
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
        result.unsubscribe();
      }
    });
  }
);

test.each([false, true])("database.reactiveGetIfExists", async async => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const result = async
      ? await db.reactiveGetIfExistsAsync(id)
      : db.reactiveGetIfExists(id);

    {
      expect(result.loaded).toStrictEqual(async);
      await handlePromise.runAll();
      assert.toBeTrue(result.loaded);
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
      result.unsubscribe();
    }
  });
});

test.each([false, true])("database.reactiveQuery", async async => {
  expect.hasAssertions();

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
      assert.toBeTrue(result.loaded);
      expect(result.value).toStrictEqual([]);
    }

    {
      const { id, rev } = await db.put({ type: "a" });

      await wait(1000);
      expect(result.value).toStrictEqual([{ _id: id, _rev: rev, type: "a" }]);
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test.each([false, true])("database.reactiveQueryAttached", async async => {
  expect.hasAssertions();

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
      assert.toBeTrue(result.loaded);
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
      result.unsubscribe();
    }
  });
});

test.each([false, true])("database.reactiveUnsettled", async async => {
  expect.hasAssertions();

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
      assert.toBeTrue(result.loaded);
      expect(result.value).toBe(1);
    }

    {
      await wait(2.5 * 3600 * 1000);
      expect(result.value).toBe(0);
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test.each([false, true])("database.reactiveUnsettledAttached", async async => {
  expect.hasAssertions();

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
      assert.toBeTrue(result.loaded);
      expect(result.value).toBe(1);
    }

    {
      await wait(2.5 * 3600 * 1000);
      expect(result.value).toBe(0);
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test("handlers.error", () => {
  const error = new Error("Sample error");

  expect(() => {
    handlers.error(error);
  }).toThrow(error);
});
