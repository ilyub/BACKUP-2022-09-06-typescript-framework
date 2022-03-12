import type { Conditions, QueryOptions } from "@skylib/facades/dist/database";
import { database } from "@skylib/facades/dist/database";
import { datetime } from "@skylib/facades/dist/datetime";
import { uniqueId } from "@skylib/facades/dist/uniqueId";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("queryAttached", async () => {
  const db = database.create(uniqueId());

  await db.bulkDocs([
    { _id: "b1", attachedDocs: [{ _id: 0, _rev: 1, b: true }] },
    { _id: "b2", attachedDocs: [{ _id: 0, _rev: 1, b: false }] },
    {
      _id: "d1",
      attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 11:40" }]
    },
    {
      _id: "d2",
      attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 11:50" }]
    },
    {
      _id: "d3",
      attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 12:10" }]
    },
    {
      _id: "d4",
      attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 12:20" }]
    },
    { _id: "n1", attachedDocs: [{ _id: 0, _rev: 1, n: 1 }] },
    { _id: "n2", attachedDocs: [{ _id: 0, _rev: 1, n: 2 }] },
    { _id: "n3", attachedDocs: [{ _id: 0, _rev: 1, n: 3 }] },
    { _id: "s1", attachedDocs: [{ _id: 0, _rev: 1, s: "AAA" }] },
    { _id: "s2", attachedDocs: [{ _id: 0, _rev: 1, s: "bbb" }] },
    { _id: "s3", attachedDocs: [{ _id: 0, _rev: 1, s: "CCC" }] }
  ]);

  await Promise.all([
    subtest(undefined, [
      "b1",
      "b2",
      "d1",
      "d2",
      "d3",
      "d4",
      "n1",
      "n2",
      "n3",
      "s1",
      "s2",
      "s3"
    ]),
    subtest({ b: { eq: true } }, ["b1"]),
    subtest({ b: { eq: false } }, ["b2"]),
    subtest({ d: { dateGt: "2001-02-15 11:45" } }, ["d2", "d3", "d4"]),
    subtest({ d: { dateLt: "2001-02-15 11:45" } }, ["d1"]),
    subtest({ d: { dateGt: "2001-02-15 12:00" } }, ["d3", "d4"]),
    subtest({ d: { dateLt: "2001-02-15 12:00" } }, ["d1", "d2"]),
    subtest({ d: { dateGt: "2001-02-15 12:15" } }, ["d4"]),
    subtest({ d: { dateLt: "2001-02-15 12:15" } }, ["d1", "d2", "d3"]),
    subtest({ n: { gt: 2 } }, ["n3"]),
    subtest({ n: { gte: 2 } }, ["n2", "n3"]),
    subtest({ n: { lt: 2 } }, ["n1"]),
    subtest({ n: { lte: 2 } }, ["n1", "n2"]),
    subtest({ s: { eq: "bbb" } }, ["s2"])
  ]);

  async function subtest(
    conditions: Conditions | undefined,
    expected: unknown[]
  ): Promise<void> {
    const docs = await db.queryAttached(conditions);

    expect(docs.map(doc => doc.parentDoc._id)).toStrictEqual(expected);
  }
});

test("queryAttached: Combined", async () => {
  const db = database.create(uniqueId());

  await db.bulkDocs([
    {
      _id: "d1",
      attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 11:50" }],
      d: "2001-02-15 11:50"
    },
    {
      _id: "d2",
      attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 11:50" }],
      d: "2001-02-15 12:10"
    },
    {
      _id: "d3",
      attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 12:10" }],
      d: "2001-02-15 11:50"
    },
    {
      _id: "d4",
      attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 12:10" }],
      d: "2001-02-15 12:10"
    }
  ]);

  await Promise.all([
    subtest(
      { d: { dateGt: "2001-02-15 12:00" } },
      { d: { dateGt: "2001-02-15 12:00" } },
      ["d4"]
    ),
    subtest(
      { d: { dateGt: "2001-02-15 12:00" } },
      { d: { dateLt: "2001-02-15 12:00" } },
      ["d3"]
    ),
    subtest(
      { d: { dateLt: "2001-02-15 12:00" } },
      { d: { dateGt: "2001-02-15 12:00" } },
      ["d2"]
    ),
    subtest(
      { d: { dateLt: "2001-02-15 12:00" } },
      { d: { dateLt: "2001-02-15 12:00" } },
      ["d1"]
    )
  ]);

  async function subtest(
    conditions: Conditions,
    parentConditions: Conditions,
    expected: unknown[]
  ): Promise<void> {
    const docs = await db.queryAttached(conditions, parentConditions);

    expect(docs.map(doc => doc.parentDoc._id)).toStrictEqual(expected);
  }
});

test("queryAttached: Options", async () => {
  const db = database.create(uniqueId());

  await db.bulkDocs([
    { _id: "id1", attachedDocs: [{ _id: 0, _rev: 1, n: 1, s: 3 }] },
    { _id: "id2", attachedDocs: [{ _id: 0, _rev: 1, n: 1, s: 3 }] },
    { _id: "id3", attachedDocs: [{ _id: 0, _rev: 1, n: 1, s: undefined }] },
    { _id: "id4", attachedDocs: [{ _id: 0, _rev: 1, n: 1, s: 2 }] },
    { _id: "id5", attachedDocs: [{ _id: 0, _rev: 1, n: 2, s: 1 }] }
  ]);

  await Promise.all([
    subtest({ limit: 2 }, ["id1", "id2"]),
    subtest({ limit: 2, skip: 1 }, ["id2", "id3"]),
    subtest({ limit: 2, skip: 1, sortBy: "s" }, ["id4", "id1"]),
    subtest({ descending: true, limit: 2, skip: 1, sortBy: "s" }, [
      "id2",
      "id1"
    ]),
    subtest({ descending: true, limit: 2, skip: 1 }, ["id3", "id2"]),
    subtest({ limit: 2, sortBy: "s" }, ["id3", "id4"]),
    subtest({ descending: true, limit: 2, sortBy: "s" }, ["id3", "id2"]),
    subtest({ descending: true, limit: 2 }, ["id4", "id3"]),
    subtest({ skip: 1 }, ["id2", "id3", "id4"]),
    subtest({ skip: 1, sortBy: "s" }, ["id4", "id1", "id2"]),
    subtest({ descending: true, skip: 1, sortBy: "s" }, ["id2", "id1", "id4"]),
    subtest({ descending: true, skip: 1 }, ["id3", "id2", "id1"]),
    subtest({ sortBy: "s" }, ["id3", "id4", "id1", "id2"]),
    subtest({ descending: true, sortBy: "s" }, ["id3", "id2", "id1", "id4"]),
    subtest({ descending: true }, ["id4", "id3", "id2", "id1"])
  ]);

  async function subtest(
    options: QueryOptions,
    expected: unknown[]
  ): Promise<void> {
    const docs = await db.queryAttached({ n: { eq: 1 } }, {}, options);

    expect(docs.map(doc => doc.parentDoc._id)).toStrictEqual(expected);
  }
});

test("queryAttached: Time evolution", async () => {
  expect.hasAssertions();

  testUtils
    .getClock()
    .setSystemTime(datetime.create("2001-02-15 12:00").toDate());

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    await db.bulkDocs([
      {
        _id: "id1",
        attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-13 12:00" }]
      },
      {
        _id: "id2",
        attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 10:00" }]
      },
      {
        _id: "id3",
        attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 11:00" }]
      },
      {
        _id: "id4",
        attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 13:00" }]
      },
      {
        _id: "id5",
        attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-15 14:00" }]
      },
      {
        _id: "id6",
        attachedDocs: [{ _id: 0, _rev: 1, d: "2001-02-17 12:00" }]
      }
    ]);

    await Promise.all([
      subtest({ d: { dateGt: ["now"] } }, ["id4", "id5", "id6"]),
      subtest({ d: { dateLt: ["now"] } }, ["id1", "id2", "id3"])
    ]);

    await wait(1.5 * 3600 * 1000);

    await Promise.all([
      subtest({ d: { dateGt: ["now"] } }, ["id5", "id6"]),
      subtest({ d: { dateLt: ["now"] } }, ["id1", "id2", "id3", "id4"])
    ]);

    await wait(1.5 * 3600 * 1000);

    await Promise.all([
      subtest({ d: { dateGt: ["now"] } }, ["id6"]),
      subtest({ d: { dateLt: ["now"] } }, ["id1", "id2", "id3", "id4", "id5"])
    ]);

    async function subtest(
      conditions: Conditions,
      expected: unknown[]
    ): Promise<void> {
      const docs = await db.queryAttached(conditions);

      expect(docs.map(doc => doc.parentDoc._id)).toStrictEqual(expected);
    }
  });
});

test("query: Unexpected value type", async () => {
  const db = database.create(uniqueId());

  const error = new Error("Unexpected value type: undefined");

  await expect(
    db.queryAttached({ b: { eq: undefined } })
  ).rejects.toStrictEqual(error);
});
