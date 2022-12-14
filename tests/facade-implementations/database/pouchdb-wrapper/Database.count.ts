/* eslint jest/max-expects: [warn, { max: 13 }] -- Ok */

import * as testUtils from "@skylib/functions/dist/test-utils";
import {
  database,
  handlePromise,
  reactiveStorage,
  uniqueId
} from "@skylib/facades";
import type { Writable } from "@skylib/functions";
import { implementations } from "@";
import { wait } from "@skylib/functions";

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

  const conds = { d: { dateGt: "2001-02-15 13:00" } } as const;

  await expect(
    Promise.all([db.count(), db.count(conds)])
  ).resolves.toStrictEqual([4, 1]);
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

  const conds = { y: { eq: "a" } } as const;

  const parentConds = { x: { eq: "a" } } as const;

  const expected = [4, 2, 2, 1] as const;

  await expect(
    Promise.all([
      db.countAttached(),
      db.countAttached({}, parentConds),
      db.countAttached(conds, {}),
      db.countAttached(conds, parentConds)
    ])
  ).resolves.toStrictEqual(expected);
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
      expect(result.loading).toBeTrue();
      expect(result.value).toBeUndefined();
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.loading).toBeFalse();
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
      await wait(1000);
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
      expect(result.loading).toBeTrue();
      expect(result.value).toBeUndefined();
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.loading).toBeFalse();
      expect(result.value).toBe(0);
    }

    {
      await db.putAttached(id, { type: "a" });
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
      await wait(1000);
    }
  });
});
