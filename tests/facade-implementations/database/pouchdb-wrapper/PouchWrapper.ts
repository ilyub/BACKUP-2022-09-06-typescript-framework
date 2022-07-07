import { implementations } from "@";
import { Database } from "@/facade-implementations/database/pouchdb-wrapper/Database";
import { datetime, uniqueId } from "@skylib/facades";
import { wait } from "@skylib/functions";
import * as testUtils from "@skylib/functions/dist/test-utils";
import type { database } from "@skylib/facades";
import type { unknowns } from "@skylib/functions";

const pouchdb = new implementations.database.PouchWrapper();

const PouchRetryError = implementations.database.PouchWrapper.PouchRetryError;

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("create: config.reindexThreshold", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    testUtils.clock.setSystemTime(datetime.create("2001-02-15 12:00").toDate());

    const db1 = new Database(uniqueId());

    const db2 = new Database(uniqueId(), {}, { reindexThreshold: 2 });

    const docs = [
      { d: "2001-02-12 12:00" },
      { d: "2001-02-15 11:00" },
      { d: "2001-02-15 13:00" },
      { d: "2001-02-18 12:00" }
    ] as const;

    await Promise.all([db1.bulkDocs(docs), db2.bulkDocs(docs)]);

    await expect(
      Promise.all([
        unsettled(db1, { d: { dateGt: ["now"] } }),
        unsettled(db2, { d: { dateGt: ["now"] } })
      ])
    ).resolves.toStrictEqual([3, 3]);

    await wait(49.5 * 3600 * 1000);

    await expect(
      Promise.all([
        unsettled(db1, { d: { dateGt: ["now"] } }),
        unsettled(db2, { d: { dateGt: ["now"] } })
      ])
    ).resolves.toStrictEqual([2, 3]);

    await wait(2 * 3600 * 1000);

    await expect(
      Promise.all([
        unsettled(db1, { d: { dateGt: ["now"] } }),
        unsettled(db2, { d: { dateGt: ["now"] } })
      ])
    ).resolves.toStrictEqual([1, 1]);

    async function unsettled(
      db: Database,
      conditions: database.Conditions
    ): Promise<number> {
      await db.query(conditions);

      return await db.unsettled(conditions);
    }
  });
});

test("create: options.caseSensitiveSorting", async () => {
  const db1 = pouchdb.create(uniqueId());

  const db2 = pouchdb.create(uniqueId(), { caseSensitiveSorting: true });

  const docs = [
    {
      attachedDocs: [
        {
          _id: 0,
          _rev: 1,
          y: "eee"
        }
      ],
      x: "bbb"
    },
    {
      attachedDocs: [
        {
          _id: 0,
          _rev: 1,
          y: "DDD"
        }
      ],
      x: "AAA"
    },
    {
      attachedDocs: [
        {
          _id: 0,
          _rev: 1,
          y: "FFF"
        }
      ],
      x: "CCC"
    }
  ] as const;

  await Promise.all([db1.bulkDocs(docs), db2.bulkDocs(docs)]);

  await expect(
    Promise.all([
      query(db1),
      query(db2),
      queryAttached(db1),
      queryAttached(db2)
    ])
  ).resolves.toStrictEqual([
    ["AAA", "bbb", "CCC"],
    ["AAA", "CCC", "bbb"],
    ["DDD", "eee", "FFF"],
    ["DDD", "FFF", "eee"]
  ]);

  async function query(db: database.Database): Promise<unknowns> {
    const result = await db.query({}, { sortBy: "x" });

    return result.map(doc => doc["x"]);
  }

  async function queryAttached(db: database.Database): Promise<unknowns> {
    const result = await db.queryAttached({}, {}, { sortBy: "y" });

    return result.map(doc => doc["y"]);
  }
});

test("create: options.migrations", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const name = uniqueId();

    const id = uniqueId();

    const db1 = pouchdb.create(name, {
      migrations: [
        {
          callback: async (db): Promise<void> => {
            await db.put({ _id: id });
          },
          id: "migration1"
        }
      ]
    });

    await expect(db1.exists(id)).resolves.toBeTrue();

    const callback1 = jest.fn();

    const callback2 = jest.fn();

    const db2 = pouchdb.create(name, {
      migrations: [
        { callback: callback1, id: "migration1" },
        { callback: callback2, id: "migration2" }
      ]
    });

    {
      await wait(1000);
      expect(callback1).mockCallsToBe();
      expect(callback2).mockCallsToBe();
    }

    {
      await expect(db2.exists(id)).resolves.toBeTrue();
      expect(callback1).mockCallsToBe();
      expect(callback2).mockCallsToBe([db2]);
    }
  });
});

test("create: options.retries = 0", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    testUtils.clock.setSystemTime(datetime.create("2001-02-15 12:00").toDate());

    const db = pouchdb.create(uniqueId());

    const id = uniqueId();

    await db.put({ _id: id });

    await expect(
      Promise.all([db.putAttached(id, {}), db.putAttached(id, {})])
    ).rejects.toStrictEqual(new PouchRetryError("Failed after 0 retries"));

    await db.bulkDocs([
      { d: "2001-02-12 12:00" },
      { d: "2001-02-15 11:00" },
      { d: "2001-02-15 13:00" },
      { d: "2001-02-18 12:00" }
    ]);

    await expect(
      Promise.all([
        unsettled({ d: { dateEq: ["now"] } }),
        unsettled({ d: { dateEq: ["now"] } }),
        unsettled({ d: { dateEq: ["now"] } })
      ])
    ).resolves.toStrictEqual([3, 3, 3]);

    await wait(49.5 * 3600 * 1000);

    await expect(
      Promise.all([
        unsettled({ d: { dateEq: ["now"] } }),
        unsettled({ d: { dateEq: ["now"] } }),
        unsettled({ d: { dateEq: ["now"] } })
      ])
    ).rejects.toStrictEqual(new PouchRetryError("Failed after 0 retries"));

    async function unsettled(
      conditions?: database.Conditions
    ): Promise<number> {
      await db.query(conditions);

      return await db.unsettled(conditions);
    }
  });
});

test("create: options.retries = 1", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    testUtils.clock.setSystemTime(datetime.create("2001-02-15 12:00").toDate());

    const db = pouchdb.create(uniqueId(), { retries: 1 });

    const id = uniqueId();

    await db.put({ _id: id });

    await expect(
      Promise.all([db.putAttached(id, {}), db.putAttached(id, {})])
    ).resolves.toBeInstanceOf(Array);

    await db.bulkDocs([
      { d: "2001-02-12 12:00" },
      { d: "2001-02-15 11:00" },
      { d: "2001-02-15 13:00" },
      { d: "2001-02-18 12:00" }
    ]);

    await expect(
      Promise.all([
        unsettled({ d: { dateEq: ["now"] } }),
        unsettled({ d: { dateEq: ["now"] } }),
        unsettled({ d: { dateEq: ["now"] } })
      ])
    ).resolves.toStrictEqual([3, 3, 3]);

    await wait(49.5 * 3600 * 1000);

    await expect(
      Promise.all([
        unsettled({ d: { dateEq: ["now"] } }),
        unsettled({ d: { dateEq: ["now"] } }),
        unsettled({ d: { dateEq: ["now"] } })
      ])
    ).resolves.toStrictEqual([2, 2, 2]);

    async function unsettled(
      conditions?: database.Conditions
    ): Promise<number> {
      await db.query(conditions);

      return await db.unsettled(conditions);
    }
  });
});

test.each([1, 2, 3, 4, 5])("create: pouchConfig.revsLimit", async revsLimit => {
  const db = new Database(uniqueId(), {}, {}, { revs_limit: revsLimit });

  const { id: id1, rev: rev1 } = await db.put({});

  const { id: id2, rev: rev2 } = await db.put({ _id: id1, _rev: rev1 });

  const { id: id3, rev: rev3 } = await db.put({ _id: id2, _rev: rev2 });

  const rawDb = await db.getRawDb();

  const doc = await rawDb.get(id3, { revs: true });

  expect(doc._revisions).toStrictEqual({
    ids: [rev3, rev2, rev1].slice(0, revsLimit).map(rev => rev.slice(2)),
    start: 3
  });
});
