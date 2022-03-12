import type { Conditions, QueryOptions } from "@skylib/facades/dist/database";
import { database } from "@skylib/facades/dist/database";
import { datetime } from "@skylib/facades/dist/datetime";
import { uniqueId } from "@skylib/facades/dist/uniqueId";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("query", async () => {
  const db = database.create(uniqueId());

  await db.bulkDocs([
    { _id: "b1", b: true },
    { _id: "b2", b: false },
    { _id: "n1", n: 1 },
    { _id: "n2", n: 2 },
    { _id: "n3", n: 3 },
    { _id: "s1", s: "AAA" },
    { _id: "s2", s: "bbb" },
    { _id: "s3", s: "CCC" }
  ]);

  await Promise.all([
    subtest(undefined, ["b1", "b2", "n1", "n2", "n3", "s1", "s2", "s3"]),
    subtest({ b: { eq: true } }, ["b1"]),
    subtest({ b: { eq: false } }, ["b2"]),
    subtest({ n: { gt: 2 } }, ["n3"]),
    subtest({ n: { gte: 2 } }, ["n2", "n3"]),
    subtest({ n: { lt: 2 } }, ["n1"]),
    subtest({ n: { lte: 2 } }, ["n1", "n2"]),
    subtest({ s: { eq: "bbb" } }, ["s2"])
  ]);

  async function subtest(
    conditions: Conditions | undefined,
    expected: string[]
  ): Promise<void> {
    const docs = await db.query(conditions);

    expect(docs.map(doc => doc._id)).toStrictEqual(expected);
  }
});

test("query: Date condition 1", async () => {
  const db = database.create(uniqueId());

  await db.bulkDocs([
    { _id: "d1", d: "2001-02-15 12:00" },
    { _id: "d2", d: "2001-02-16 12:00" }
  ]);

  await Promise.all([
    subtest({ d: { dateEq: "2001-02-15 12:00" } }, ["d1"]),
    subtest({ d: { dateNeq: "2001-02-15 12:00" } }, ["d2"])
  ]);

  async function subtest(
    conditions: Conditions | undefined,
    expected: string[]
  ): Promise<void> {
    const docs = await db.query(conditions);

    expect(docs.map(doc => doc._id)).toStrictEqual(expected);
  }
});

test("query: Date condition 2", async () => {
  testUtils
    .getClock()
    .setSystemTime(datetime.create("2001-02-15 12:30").toDate());

  const db = database.create(uniqueId());

  await db.bulkDocs([
    { _id: "endOfDay", d: "2001-02-16 00:00" },
    { _id: "endOfHour", d: "2001-02-15 13:00" },
    { _id: "endOfMonth", d: "2001-03-01 00:00" },
    { _id: "endOfWeek", d: "2001-02-18 00:00" },
    { _id: "now", d: "2001-02-15 12:30" },
    { _id: "startOfDay", d: "2001-02-15 00:00" },
    { _id: "startOfHour", d: "2001-02-15 12:00" },
    { _id: "startOfMonth", d: "2001-02-01 00:00" },
    { _id: "startOfWeek", d: "2001-02-11 00:00" }
  ]);

  await Promise.all([
    subtest({ d: { dateEq: ["endOfDay"] } }, ["endOfDay"]),
    subtest({ d: { dateEq: ["endOfHour"] } }, ["endOfHour"]),
    subtest({ d: { dateEq: ["endOfMonth"] } }, ["endOfMonth"]),
    subtest({ d: { dateEq: ["endOfWeek"] } }, ["endOfWeek"]),
    subtest({ d: { dateEq: ["now"] } }, ["now"]),
    subtest({ d: { dateEq: ["startOfDay"] } }, ["startOfDay"]),
    subtest({ d: { dateEq: ["startOfHour"] } }, ["startOfHour"]),
    subtest({ d: { dateEq: ["startOfMonth"] } }, ["startOfMonth"]),
    subtest({ d: { dateEq: ["startOfWeek"] } }, ["startOfWeek"])
  ]);

  async function subtest(
    conditions: Conditions | undefined,
    expected: string[]
  ): Promise<void> {
    const docs = await db.query(conditions);

    expect(docs.map(doc => doc._id)).toStrictEqual(expected);
  }
});

test("query: Date condition 3", async () => {
  testUtils
    .getClock()
    .setSystemTime(datetime.create("2001-02-15 12:30").toDate());

  const db = database.create(uniqueId());

  await db.bulkDocs([
    { _id: "m1m", d: "2001-02-15 12:29" },
    { _id: "m2m", d: "2001-02-15 12:28" },
    { _id: "m1h", d: "2001-02-15 11:30" },
    { _id: "m2h", d: "2001-02-15 10:30" },
    { _id: "m1d", d: "2001-02-14 12:30" },
    { _id: "m2d", d: "2001-02-13 12:30" },
    { _id: "p1m", d: "2001-02-15 12:31" },
    { _id: "p2m", d: "2001-02-15 12:32" },
    { _id: "p1h", d: "2001-02-15 13:30" },
    { _id: "p2h", d: "2001-02-15 14:30" },
    { _id: "p1d", d: "2001-02-16 12:30" },
    { _id: "p2d", d: "2001-02-17 12:30" }
  ]);

  await Promise.all([
    subtest({ d: { dateEq: ["now", "-", 1, "minute"] } }, ["m1m"]),
    subtest({ d: { dateEq: ["now", "-", 2, "minutes"] } }, ["m2m"]),
    subtest({ d: { dateEq: ["now", "-", 1, "hour"] } }, ["m1h"]),
    subtest({ d: { dateEq: ["now", "-", 2, "hours"] } }, ["m2h"]),
    subtest({ d: { dateEq: ["now", "-", 1, "day"] } }, ["m1d"]),
    subtest({ d: { dateEq: ["now", "-", 2, "days"] } }, ["m2d"]),
    subtest({ d: { dateEq: ["now", "+", 1, "minute"] } }, ["p1m"]),
    subtest({ d: { dateEq: ["now", "+", 2, "minutes"] } }, ["p2m"]),
    subtest({ d: { dateEq: ["now", "+", 1, "hour"] } }, ["p1h"]),
    subtest({ d: { dateEq: ["now", "+", 2, "hours"] } }, ["p2h"]),
    subtest({ d: { dateEq: ["now", "+", 1, "day"] } }, ["p1d"]),
    subtest({ d: { dateEq: ["now", "+", 2, "days"] } }, ["p2d"])
  ]);

  async function subtest(
    conditions: Conditions | undefined,
    expected: string[]
  ): Promise<void> {
    const docs = await db.query(conditions);

    expect(docs.map(doc => doc._id)).toStrictEqual(expected);
  }
});

test("query: Options", async () => {
  const db = database.create(uniqueId());

  await db.bulkDocs([
    { _id: "id1", d: "2001-02-13 12:00", s: 3 },
    { _id: "id2", d: "2001-02-13 12:00", s: 3 },
    { _id: "id3", d: "2001-02-13 12:00", s: undefined },
    { _id: "id4", d: "2001-02-15 11:50", s: 2 },
    { _id: "id5", d: "2001-02-15 12:10", s: 1 }
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
    const docs = await db.query({ d: { dateLt: "2001-02-15 12:00" } }, options);

    expect(docs.map(doc => doc._id)).toStrictEqual(expected);
  }
});

test("query: Time evolution", async () => {
  expect.hasAssertions();

  testUtils
    .getClock()
    .setSystemTime(datetime.create("2001-02-15 12:00").toDate());

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    await db.bulkDocs([
      { _id: "id1", d: "2001-02-13 12:00" },
      { _id: "id2", d: "2001-02-15 10:00" },
      { _id: "id3", d: "2001-02-15 11:00" },
      { _id: "id4", d: "2001-02-15 13:00" },
      { _id: "id5", d: "2001-02-15 14:00" },
      { _id: "id6", d: "2001-02-17 12:00" }
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
      const docs = await db.query(conditions);

      expect(docs.map(doc => doc._id)).toStrictEqual(expected);
    }
  });
});

test("query: Unexpected value type", async () => {
  const db = database.create(uniqueId());

  const error = new Error("Unexpected value type: undefined");

  await expect(db.query({ b: { eq: undefined } })).rejects.toStrictEqual(error);
});
