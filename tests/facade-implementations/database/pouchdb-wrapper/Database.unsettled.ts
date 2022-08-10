/* eslint jest/max-expects: [warn, { max: 7 }] -- Ok */

import * as testUtils from "@skylib/functions/dist/test-utils";
import {
  RelativeDate,
  TimeUnit,
  database,
  datetime,
  handlePromise,
  uniqueId
} from "@skylib/facades";
import { implementations } from "@";
import { wait } from "@skylib/functions";

const pouchdb = new implementations.database.PouchWrapper();

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("reactiveUnsettled", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    testUtils.clock.setSystemTime(datetime.create("2001-02-15 12:00").toDate());

    const db = database.create(uniqueId());

    await db.put({ d: "2001-02-13 10:30" });

    const config: database.ReactiveConfig = {
      conditions: { d: { dateGt: [RelativeDate.now] } },
      updateInterval: 3600 * 1000
    };

    const result = db.reactiveUnsettled(config);

    {
      expect(result.loaded).toBeFalse();
      expect(result.loading).toBeTrue();
      expect(result.value).toBeUndefined();
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.loading).toBeFalse();
      expect(result.value).toBe(1);
    }

    {
      await wait(3 * 3600 * 1000);
      expect(result.value).toBe(0);
      result.unsubscribe();
    }
  });
});

test("reactiveUnsettledAttached", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    testUtils.clock.setSystemTime(datetime.create("2001-02-15 12:00").toDate());

    const db = database.create(uniqueId());

    const id = uniqueId();

    await db.put({ _id: id });
    await db.putAttached(id, { d: "2001-02-13 10:30" });

    const config: database.ReactiveConfigAttached = {
      conditions: { d: { dateGt: [RelativeDate.now] } },
      updateInterval: 3600 * 1000
    };

    const result = db.reactiveUnsettledAttached(config);

    {
      expect(result.loaded).toBeFalse();
      expect(result.loading).toBeTrue();
      expect(result.value).toBeUndefined();
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
      expect(result.loading).toBeFalse();
      expect(result.value).toBe(1);
    }

    {
      await wait(3 * 3600 * 1000);
      expect(result.value).toBe(0);
      result.unsubscribe();
    }
  });
});

test("unsettled", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    testUtils.clock.setSystemTime(datetime.create("2001-02-14 12:00").toDate());

    const db = pouchdb.create(uniqueId(), { retries: 2 });

    await db.bulkDocs([
      { d: "2001-02-12 12:00" },
      { d: "2001-02-15 11:00" },
      { d: "2001-02-15 13:00" },
      { d: "2001-02-18 12:00" }
    ]);
    await expect(
      Promise.all([
        unsettled(),
        unsettled({ d: { dateEq: [RelativeDate.now, "+", 1, TimeUnit.day] } }),
        unsettled({ d: { dateNeq: [RelativeDate.now, "+", 1, TimeUnit.day] } }),
        unsettled({ d: { dateGt: [RelativeDate.now, "+", 1, TimeUnit.day] } }),
        unsettled({ d: { dateLt: [RelativeDate.now, "+", 1, TimeUnit.day] } })
      ])
    ).resolves.toStrictEqual([0, 3, 3, 3, 3]);
    await wait(49.5 * 3600 * 1000);
    await expect(
      Promise.all([
        unsettled(),
        unsettled({ d: { dateEq: [RelativeDate.now, "+", 1, TimeUnit.day] } }),
        unsettled({ d: { dateNeq: [RelativeDate.now, "+", 1, TimeUnit.day] } }),
        unsettled({ d: { dateGt: [RelativeDate.now, "+", 1, TimeUnit.day] } }),
        unsettled({ d: { dateLt: [RelativeDate.now, "+", 1, TimeUnit.day] } })
      ])
    ).resolves.toStrictEqual([0, 2, 2, 2, 2]);
    await wait(2 * 3600 * 1000);
    await expect(
      Promise.all([
        unsettled(),
        unsettled({ d: { dateEq: [RelativeDate.now, "+", 1, TimeUnit.day] } }),
        unsettled({ d: { dateNeq: [RelativeDate.now, "+", 1, TimeUnit.day] } }),
        unsettled({ d: { dateGt: [RelativeDate.now, "+", 1, TimeUnit.day] } }),
        unsettled({ d: { dateLt: [RelativeDate.now, "+", 1, TimeUnit.day] } })
      ])
    ).resolves.toStrictEqual([0, 1, 1, 1, 1]);

    async function unsettled(
      conditions?: database.Conditions
    ): Promise<number> {
      await db.query(conditions);

      return await db.unsettled(conditions);
    }
  });
});

test("unsettledAttached", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    testUtils.clock.setSystemTime(datetime.create("2001-02-16 12:00").toDate());

    const db = pouchdb.create(uniqueId(), { retries: 2 });

    const id1 = uniqueId();

    const id2 = uniqueId();

    await db.bulkDocs([{ _id: id1 }, { _id: id2 }]);
    await db.bulkDocsAttached([
      { d: "2001-02-12 12:00", parentDoc: { _id: id1, _rev: uniqueId() } },
      { d: "2001-02-15 11:00", parentDoc: { _id: id1, _rev: uniqueId() } },
      { d: "2001-02-15 13:00", parentDoc: { _id: id2, _rev: uniqueId() } },
      { d: "2001-02-18 12:00", parentDoc: { _id: id2, _rev: uniqueId() } }
    ]);
    await expect(
      Promise.all([
        unsettled(),
        unsettled({ d: { dateEq: [RelativeDate.now, "-", 1, TimeUnit.day] } }),
        unsettled({ d: { dateNeq: [RelativeDate.now, "-", 1, TimeUnit.day] } }),
        unsettled({ d: { dateGt: [RelativeDate.now, "-", 1, TimeUnit.day] } }),
        unsettled({ d: { dateLt: [RelativeDate.now, "-", 1, TimeUnit.day] } })
      ])
    ).resolves.toStrictEqual([0, 3, 3, 3, 3]);
    await wait(49.5 * 3600 * 1000);
    await expect(
      Promise.all([
        unsettled(),
        unsettled({ d: { dateEq: [RelativeDate.now, "-", 1, TimeUnit.day] } }),
        unsettled({ d: { dateNeq: [RelativeDate.now, "-", 1, TimeUnit.day] } }),
        unsettled({ d: { dateGt: [RelativeDate.now, "-", 1, TimeUnit.day] } }),
        unsettled({ d: { dateLt: [RelativeDate.now, "-", 1, TimeUnit.day] } })
      ])
    ).resolves.toStrictEqual([0, 2, 2, 2, 2]);
    await wait(2 * 3600 * 1000);
    await expect(
      Promise.all([
        unsettled(),
        unsettled({ d: { dateEq: [RelativeDate.now, "-", 1, TimeUnit.day] } }),
        unsettled({ d: { dateNeq: [RelativeDate.now, "-", 1, TimeUnit.day] } }),
        unsettled({ d: { dateGt: [RelativeDate.now, "-", 1, TimeUnit.day] } }),
        unsettled({ d: { dateLt: [RelativeDate.now, "-", 1, TimeUnit.day] } })
      ])
    ).resolves.toStrictEqual([0, 1, 1, 1, 1]);

    async function unsettled(
      conditions?: database.Conditions
    ): Promise<number> {
      await db.queryAttached(conditions);

      return await db.unsettledAttached(conditions);
    }
  });
});

test("unsettledAttached: Combined", async () => {
  expect.hasAssertions();
  testUtils.clock.setSystemTime(datetime.create("2001-02-15 12:00").toDate());
  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const id1 = uniqueId();

    const id2 = uniqueId();

    const id3 = uniqueId();

    const id4 = uniqueId();

    await db.bulkDocs([
      { _id: id1, d: "2001-02-12 12:00" },
      { _id: id2, d: "2001-02-15 11:00" },
      { _id: id3, d: "2001-02-15 13:00" },
      { _id: id4, d: "2001-02-18 12:00" }
    ]);
    await db.bulkDocsAttached([
      { d: "2001-02-12 12:00", parentDoc: { _id: id1, _rev: uniqueId() } },
      { d: "2001-02-15 11:00", parentDoc: { _id: id1, _rev: uniqueId() } },
      { d: "2001-02-15 13:00", parentDoc: { _id: id1, _rev: uniqueId() } },
      { d: "2001-02-18 12:00", parentDoc: { _id: id1, _rev: uniqueId() } },
      { d: "2001-02-12 12:00", parentDoc: { _id: id2, _rev: uniqueId() } },
      { d: "2001-02-15 11:00", parentDoc: { _id: id2, _rev: uniqueId() } },
      { d: "2001-02-15 13:00", parentDoc: { _id: id2, _rev: uniqueId() } },
      { d: "2001-02-18 12:00", parentDoc: { _id: id2, _rev: uniqueId() } },
      { d: "2001-02-12 12:00", parentDoc: { _id: id3, _rev: uniqueId() } },
      { d: "2001-02-15 11:00", parentDoc: { _id: id3, _rev: uniqueId() } },
      { d: "2001-02-15 13:00", parentDoc: { _id: id3, _rev: uniqueId() } },
      { d: "2001-02-18 12:00", parentDoc: { _id: id3, _rev: uniqueId() } },
      { d: "2001-02-12 12:00", parentDoc: { _id: id4, _rev: uniqueId() } },
      { d: "2001-02-15 11:00", parentDoc: { _id: id4, _rev: uniqueId() } },
      { d: "2001-02-15 13:00", parentDoc: { _id: id4, _rev: uniqueId() } },
      { d: "2001-02-18 12:00", parentDoc: { _id: id4, _rev: uniqueId() } }
    ]);
    await expect(
      Promise.all([
        unsettled(
          { d: { dateGt: [RelativeDate.now] } },
          { d: { dateGt: [RelativeDate.now] } }
        ),
        unsettled(
          { d: { dateGt: [RelativeDate.now] } },
          { d: { dateLt: [RelativeDate.now] } }
        ),
        unsettled(
          { d: { dateLt: [RelativeDate.now] } },
          { d: { dateGt: [RelativeDate.now] } }
        ),
        unsettled(
          { d: { dateLt: [RelativeDate.now] } },
          { d: { dateLt: [RelativeDate.now] } }
        )
      ])
    ).resolves.toStrictEqual([9, 12, 12, 15]);
    await wait(49.5 * 3600 * 1000);
    await expect(
      Promise.all([
        unsettled(
          { d: { dateGt: [RelativeDate.now] } },
          { d: { dateGt: [RelativeDate.now] } }
        ),
        unsettled(
          { d: { dateGt: [RelativeDate.now] } },
          { d: { dateLt: [RelativeDate.now] } }
        ),
        unsettled(
          { d: { dateLt: [RelativeDate.now] } },
          { d: { dateGt: [RelativeDate.now] } }
        ),
        unsettled(
          { d: { dateLt: [RelativeDate.now] } },
          { d: { dateLt: [RelativeDate.now] } }
        )
      ])
    ).resolves.toStrictEqual([4, 8, 8, 12]);
    await wait(2 * 3600 * 1000);
    await expect(
      Promise.all([
        unsettled(
          { d: { dateGt: [RelativeDate.now] } },
          { d: { dateGt: [RelativeDate.now] } }
        ),
        unsettled(
          { d: { dateGt: [RelativeDate.now] } },
          { d: { dateLt: [RelativeDate.now] } }
        ),
        unsettled(
          { d: { dateLt: [RelativeDate.now] } },
          { d: { dateGt: [RelativeDate.now] } }
        ),
        unsettled(
          { d: { dateLt: [RelativeDate.now] } },
          { d: { dateLt: [RelativeDate.now] } }
        )
      ])
    ).resolves.toStrictEqual([1, 4, 4, 7]);

    async function unsettled(
      conditions: database.Conditions,
      parentConditions: database.Conditions
    ): Promise<number> {
      await db.queryAttached(conditions, parentConditions);

      return await db.unsettledAttached(conditions, parentConditions);
    }
  });
});
