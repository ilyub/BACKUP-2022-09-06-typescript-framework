import {
  database,
  datetime,
  handlePromise,
  reactiveStorage,
  uniqueId
} from "@skylib/facades";
import { assert, fn, wait, testUtils } from "@skylib/functions";
import type { Writable } from "@skylib/functions";
import * as facadeImplementations from "@/facade-implementations";
// eslint-disable-next-line import/no-internal-modules -- Ok
import { handlers } from "@/facade-implementations/database/PouchDBWrapper/Database";

const errorHandler = jest.spyOn(handlers, "error");

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("database.reactiveCount", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const config = reactiveStorage<Writable<database.ReactiveConfig>>({
      conditions: { type: { eq: "a" } },
      update(doc: database.ExistingDocument): boolean {
        return doc["type"] === "a";
      }
    });

    const db = database.create(uniqueId());

    const result = db.reactiveCount(config);

    {
      expect(result.loaded).toBe(false);
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

test("database.reactiveCountAttached", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const config = reactiveStorage<Writable<database.ReactiveConfigAttached>>({
      conditions: { type: { eq: "a" } },
      update(doc: database.ExistingAttachedDocument): boolean {
        return doc["type"] === "a";
      }
    });

    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = db.reactiveCountAttached(config);

    {
      expect(result.loaded).toBe(false);
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

test("database.reactiveExists", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const result = db.reactiveExists(id);

    {
      expect(result.loaded).toBe(false);
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

test("database.reactiveExistsAttached", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = db.reactiveExistsAttached(0, parentId);

    {
      expect(result.loaded).toBe(false);
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

test("database.reactiveGet", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const { rev: rev1 } = await db.put({ _id: id });

    const result = db.reactiveGet(id);

    {
      expect(result.loaded).toBe(false);
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
      const error =
        new facadeImplementations.database.PouchDBWrapper.PouchNotFoundError(
          "Missing document"
        );

      errorHandler.mockImplementationOnce(fn.noop);

      await db.put({
        _deleted: true,
        _id: id,
        _rev: rev2
      });

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

test("database.reactiveGetAttached", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const { parentRev: parentRev1 } = await db.putAttached(parentId, {});

    const result = db.reactiveGetAttached(0, parentId);

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

      expect(result.loaded).toBe(false);
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
      const error =
        new facadeImplementations.database.PouchDBWrapper.PouchNotFoundError(
          "Missing attached document"
        );

      errorHandler.mockImplementationOnce(fn.noop);

      await db.putAttached(parentId, {
        _deleted: true,
        _id: 0,
        _rev: 2
      });

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

test("database.reactiveGetIfExists", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const result = db.reactiveGetIfExists(id);

    {
      expect(result.loaded).toBe(false);
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
      await db.put({
        _deleted: true,
        _id: id,
        _rev: rev
      });

      await wait(1000);

      expect(result.value).toBeUndefined();
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test("database.reactiveGetIfExistsAttached", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const result = db.reactiveGetIfExistsAttached(0, parentId);

    {
      expect(result.loaded).toBe(false);
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
      await db.putAttached(parentId, {
        _deleted: true,
        _id: 0,
        _rev: 1
      });

      await wait(1000);

      expect(result.value).toBeUndefined();
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test("database.reactiveQuery", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const config: database.ReactiveConfig = {
      conditions: { type: { eq: "a" } },
      update(doc) {
        return doc["type"] === "a";
      }
    };

    const result = db.reactiveQuery(config);

    {
      expect(result.loaded).toBe(false);
      await handlePromise.runAll();
      assert.toBeTrue(result.loaded);
      expect(result.value).toStrictEqual([]);
    }

    {
      const { id, rev } = await db.put({ type: "a" });

      await wait(1000);

      expect(result.value).toStrictEqual([
        {
          _id: id,
          _rev: rev,
          type: "a"
        }
      ]);
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test("database.reactiveQueryAttached", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    const config: database.ReactiveConfigAttached = {
      conditions: { type: { eq: "a" } },
      update(doc) {
        return doc["type"] === "a";
      }
    };

    const result = db.reactiveQueryAttached(config);

    {
      expect(result.loaded).toBe(false);
      await handlePromise.runAll();
      assert.toBeTrue(result.loaded);
      expect(result.value).toStrictEqual([]);
    }

    {
      const { parentRev } = await db.putAttached(parentId, { type: "a" });

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

test("database.reactiveUnsettled", async () => {
  expect.hasAssertions();

  testUtils.clock.setSystemTime(datetime.create("2001-02-15 12:00").toDate());

  await testUtils.run(async () => {
    const config: database.ReactiveConfig = {
      conditions: { d: { dateGt: ["now"] } },
      updateInterval: 3600 * 1000
    };

    const db = database.create(uniqueId());

    await db.put({ d: "2001-02-13 10:30" });

    const result = db.reactiveUnsettled(config);

    {
      expect(result.loaded).toBe(false);
      await handlePromise.runAll();
      assert.toBeTrue(result.loaded);
      expect(result.value).toBe(1);
    }

    {
      await wait(3 * 3600 * 1000);
      expect(result.value).toBe(0);
    }

    {
      assert.toBeTrue(result.loaded);
      result.unsubscribe();
    }
  });
});

test("database.reactiveUnsettledAttached", async () => {
  expect.hasAssertions();

  testUtils.clock.setSystemTime(datetime.create("2001-02-15 12:00").toDate());

  await testUtils.run(async () => {
    const config: database.ReactiveConfigAttached = {
      conditions: { d: { dateGt: ["now"] } },
      updateInterval: 3600 * 1000
    };

    const db = database.create(uniqueId());

    const { id: parentId } = await db.put({});

    await db.putAttached(parentId, { d: "2001-02-13 10:30" });

    const result = db.reactiveUnsettledAttached(config);

    {
      expect(result.loaded).toBe(false);
      await handlePromise.runAll();
      assert.toBeTrue(result.loaded);
      expect(result.value).toBe(1);
    }

    {
      await wait(3 * 3600 * 1000);
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
