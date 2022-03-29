import type { Conditions } from "@skylib/facades/dist/database";
import { database } from "@skylib/facades/dist/database";
import { uniqueId } from "@skylib/facades/dist/uniqueId";

test("count", async () => {
  const db = database.create(uniqueId());

  await db.bulkDocs([
    { b: true },
    { b: false },
    { d: "2001-02-12 12:00" },
    { d: "2001-02-13 12:00" },
    { d: "2001-02-15 11:50" },
    { d: "2001-02-15 12:10" },
    { d: "2001-02-17 12:00" },
    { d: "2001-02-18 12:00" }
  ]);

  await Promise.all([
    subtest(undefined, 8),
    subtest([{ b: { eq: true } }], 1),
    subtest([{ b: { eq: false } }], 1),
    subtest([{ d: { dateGt: "2001-02-15 11:50" } }], 3),
    subtest([{ d: { dateGte: "2001-02-15 11:50" } }], 4),
    subtest([{ d: { dateLt: "2001-02-15 11:50" } }], 2),
    subtest([{ d: { dateLte: "2001-02-15 11:50" } }], 3),
    subtest([{ d: { dateGt: "2001-02-15 12:00" } }], 3),
    subtest([{ d: { dateLt: "2001-02-15 12:00" } }], 3),
    subtest([{ d: { dateGt: "2001-02-15 12:10" } }], 2),
    subtest([{ d: { dateGte: "2001-02-15 12:10" } }], 3),
    subtest([{ d: { dateLt: "2001-02-15 12:10" } }], 3),
    subtest([{ d: { dateLte: "2001-02-15 12:10" } }], 4),
    subtest([{ b: { isSet: true } }], 2),
    subtest([{ b: { isSet: false } }], 6),
    subtest([{ b: { neq: true } }], 7),
    subtest([{ b: { neq: false } }], 7)
  ]);

  async function subtest(
    conditions: Conditions | undefined,
    expected: number
  ): Promise<void> {
    await expect(db.count(conditions)).resolves.toStrictEqual(expected);
  }
});

test("countAttached", async () => {
  const db = database.create(uniqueId());

  await db.bulkDocs([
    {
      attachedDocs: [
        {
          _id: 0,
          _rev: 1,
          b: true
        },
        {
          _id: 1,
          _rev: 1,
          b: false
        },
        {
          _id: 2,
          _rev: 1,
          d: "2001-02-15 11:40"
        },
        {
          _id: 3,
          _rev: 1,
          d: "2001-02-15 11:50"
        }
      ],
      b: true
    },
    {
      attachedDocs: [
        {
          _id: 0,
          _rev: 1,
          d: "2001-02-15 12:10"
        },
        {
          _id: 1,
          _rev: 1,
          d: "2001-02-15 12:20"
        }
      ],
      b: false
    }
  ]);

  await Promise.all([
    subtest(undefined, undefined, 6),
    subtest({ b: { eq: true } }, undefined, 1),
    subtest({ b: { eq: true } }, { b: { eq: true } }, 1),
    subtest({ b: { eq: true } }, { b: { eq: false } }, 0),
    subtest({ b: { eq: false } }, undefined, 1),
    subtest({ b: { eq: false } }, { b: { eq: true } }, 1),
    subtest({ b: { eq: false } }, { b: { eq: false } }, 0),
    subtest({ d: { dateGt: "2001-02-15 11:45" } }, undefined, 3),
    subtest({ d: { dateLt: "2001-02-15 11:45" } }, undefined, 1),
    subtest({ d: { dateGt: "2001-02-15 11:45" } }, { b: { eq: true } }, 1),
    subtest({ d: { dateLt: "2001-02-15 11:45" } }, { b: { eq: true } }, 1),
    subtest({ d: { dateGt: "2001-02-15 11:45" } }, { b: { eq: false } }, 2),
    subtest({ d: { dateLt: "2001-02-15 11:45" } }, { b: { eq: false } }, 0),
    subtest({ d: { dateGt: "2001-02-15 12:15" } }, undefined, 1),
    subtest({ d: { dateLt: "2001-02-15 12:15" } }, undefined, 3),
    subtest({ d: { dateGt: "2001-02-15 12:15" } }, { b: { eq: true } }, 0),
    subtest({ d: { dateLt: "2001-02-15 12:15" } }, { b: { eq: true } }, 2),
    subtest({ d: { dateGt: "2001-02-15 12:15" } }, { b: { eq: false } }, 1),
    subtest({ d: { dateLt: "2001-02-15 12:15" } }, { b: { eq: false } }, 1)
  ]);

  async function subtest(
    conditions: Conditions | undefined,
    parentConditions: Conditions | undefined,
    expected: number
  ): Promise<void> {
    await expect(
      db.countAttached(conditions, parentConditions)
    ).resolves.toStrictEqual(expected);
  }
});

test("countAttached: Combined", async () => {
  const db = database.create(uniqueId());

  await db.bulkDocs([
    {
      _id: "d1",
      attachedDocs: [
        {
          _id: 0,
          _rev: 1,
          d: "2001-02-15 11:50"
        }
      ],
      d: "2001-02-15 11:50"
    },
    {
      _id: "d2",
      attachedDocs: [
        {
          _id: 0,
          _rev: 1,
          d: "2001-02-15 11:50"
        }
      ],
      d: "2001-02-15 12:10"
    },
    {
      _id: "d3",
      attachedDocs: [
        {
          _id: 0,
          _rev: 1,
          d: "2001-02-15 12:10"
        }
      ],
      d: "2001-02-15 11:50"
    },
    {
      _id: "d4",
      attachedDocs: [
        {
          _id: 0,
          _rev: 1,
          d: "2001-02-15 12:10"
        }
      ],
      d: "2001-02-15 12:10"
    }
  ]);

  await Promise.all([
    subtest(
      { d: { dateGt: "2001-02-15 12:00" } },
      { d: { dateGt: "2001-02-15 12:00" } },
      1
    ),
    subtest(
      { d: { dateGt: "2001-02-15 12:00" } },
      { d: { dateLt: "2001-02-15 12:00" } },
      1
    ),
    subtest(
      { d: { dateLt: "2001-02-15 12:00" } },
      { d: { dateGt: "2001-02-15 12:00" } },
      1
    ),
    subtest(
      { d: { dateLt: "2001-02-15 12:00" } },
      { d: { dateLt: "2001-02-15 12:00" } },
      1
    )
  ]);

  async function subtest(
    conditions: Conditions,
    parentConditions: Conditions,
    expected: number
  ): Promise<void> {
    await expect(
      db.countAttached(conditions, parentConditions)
    ).resolves.toStrictEqual(expected);
  }
});
