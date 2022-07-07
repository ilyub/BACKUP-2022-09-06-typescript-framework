import { implementations } from "@";
import {
  database,
  handlePromise,
  reactiveStorage,
  uniqueId
} from "@skylib/facades";
import { wait } from "@skylib/functions";
import * as testUtils from "@skylib/functions/dist/test-utils";
import type { Writable } from "@skylib/functions";

const pouchdb = new implementations.database.PouchWrapper();

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("count", async () => {
  const db = pouchdb.create(uniqueId());

  await db.bulkDocs([
    { d: "2001-02-12 12:00" },
    { d: "2001-02-15 11:00" },
    { d: "2001-02-15 13:00" },
    { d: "2001-02-18 12:00" }
  ]);

  const cond = { d: { dateGt: "2001-02-15 13:00" } } as const;

  await expect(db.count()).resolves.toBe(4);
  await expect(db.count(cond)).resolves.toBe(1);
});

test("countAttached", async () => {
  const db = pouchdb.create(uniqueId());

  const id1 = uniqueId();

  const id2 = uniqueId();

  const docs = [
    { _id: id1, x: "a" },
    { _id: id2, x: "b" }
  ] as const;

  const attachedDocs = [
    { parentDoc: { _id: id1, _rev: uniqueId() }, y: "a" },
    { parentDoc: { _id: id1, _rev: uniqueId() }, y: "b" },
    { parentDoc: { _id: id2, _rev: uniqueId() }, y: "a" },
    { parentDoc: { _id: id2, _rev: uniqueId() }, y: "b" }
  ] as const;

  await db.bulkDocs(docs);
  await db.bulkDocsAttached(attachedDocs);

  const conds0 = {} as const;

  const condsX = { x: { eq: "a" } } as const;

  const condsY = { y: { eq: "a" } } as const;

  await expect(
    Promise.all([
      db.countAttached(),
      db.countAttached(conds0, condsX),
      db.countAttached(condsY, conds0),
      db.countAttached(condsY, condsX)
    ])
  ).resolves.toStrictEqual([4, 2, 2, 1]);
});

test("reactiveCount", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const config = reactiveStorage<Writable<database.ReactiveConfig>>({
      conditions: { type: { eq: "a" } },
      update: doc => doc["type"] === "a"
    });

    const result = db.reactiveCount(config);

    {
      expect(result.loaded).toBeFalse();
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.value).toBe(0);
    }

    {
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
      result.unsubscribe();
      config.conditions = { type: { eq: "a" } };
      expect(result.loading).toBeFalse();
    }
  });
});

test("reactiveCountAttached", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const config = reactiveStorage<Writable<database.ReactiveConfigAttached>>({
      conditions: { type: { eq: "a" } },
      update: doc => doc["type"] === "a"
    });

    const db = database.create(uniqueId());

    const id = uniqueId();

    await db.put({ _id: id });

    const result = db.reactiveCountAttached(config);

    {
      expect(result.loaded).toBeFalse();
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
    }

    {
      await db.putAttached(id, { type: "a" });
      expect(result.value).toBe(0);
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
      result.unsubscribe();
      config.conditions = { type: { eq: "a" } };
      expect(result.loading).toBeFalse();
    }
  });
});
