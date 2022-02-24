import type { Conditions } from "@skylib/facades/dist/database";
import { database } from "@skylib/facades/dist/database";
import { datetime } from "@skylib/facades/dist/datetime";
import { uniqueId } from "@skylib/facades/dist/uniqueId";

test("count", async () => {
  const db = database.create(uniqueId());

  await db.bulkDocs([
    { b: true },
    { b: false },
    { d: datetime.create().sub(3, "days").toString() },
    { d: datetime.create().sub(2, "days").toString() },
    { d: datetime.create().sub(5, "minutes").toString() },
    { d: datetime.create().add(5, "minutes").toString() },
    { d: datetime.create().add(2, "days").toString() },
    { d: datetime.create().add(3, "days").toString() }
  ]);

  await Promise.all([
    subtest(undefined, 8),
    subtest({ b: { eq: true } }, 1),
    subtest({ b: { eq: false } }, 1),
    subtest({ d: { dgt: -10 * 60 } }, 4),
    subtest({ d: { dlt: -10 * 60 } }, 2),
    subtest({ d: { dgt: 0 } }, 3),
    subtest({ d: { dlt: 0 } }, 3),
    subtest({ d: { dgt: 10 * 60 } }, 2),
    subtest({ d: { dlt: 10 * 60 } }, 4),
    subtest({ b: { neq: true } }, 7),
    subtest({ b: { neq: false } }, 7)
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
        { _id: 0, _rev: 1, b: true },
        { _id: 1, _rev: 1, b: false },
        { _id: 2, _rev: 1, d: datetime.create().sub(20, "minutes").toString() },
        { _id: 3, _rev: 1, d: datetime.create().sub(10, "minutes").toString() }
      ],
      b: true
    },
    {
      attachedDocs: [
        { _id: 0, _rev: 1, d: datetime.create().add(10, "minutes").toString() },
        { _id: 1, _rev: 1, d: datetime.create().add(20, "minutes").toString() }
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
    subtest({ d: { dgt: -15 * 60 } }, undefined, 3),
    subtest({ d: { dlt: -15 * 60 } }, undefined, 1),
    subtest({ d: { dgt: -15 * 60 } }, { b: { eq: true } }, 1),
    subtest({ d: { dlt: -15 * 60 } }, { b: { eq: true } }, 1),
    subtest({ d: { dgt: -15 * 60 } }, { b: { eq: false } }, 2),
    subtest({ d: { dlt: -15 * 60 } }, { b: { eq: false } }, 0),
    subtest({ d: { dgt: 15 * 60 } }, undefined, 1),
    subtest({ d: { dlt: 15 * 60 } }, undefined, 3),
    subtest({ d: { dgt: 15 * 60 } }, { b: { eq: true } }, 0),
    subtest({ d: { dlt: 15 * 60 } }, { b: { eq: true } }, 2),
    subtest({ d: { dgt: 15 * 60 } }, { b: { eq: false } }, 1),
    subtest({ d: { dlt: 15 * 60 } }, { b: { eq: false } }, 1)
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
        { _id: 0, _rev: 1, d: datetime.create().sub(10, "minutes").toString() }
      ],
      d: datetime.create().sub(10, "minutes").toString()
    },
    {
      _id: "d2",
      attachedDocs: [
        { _id: 0, _rev: 1, d: datetime.create().sub(10, "minutes").toString() }
      ],
      d: datetime.create().add(10, "minutes").toString()
    },
    {
      _id: "d3",
      attachedDocs: [
        { _id: 0, _rev: 1, d: datetime.create().add(10, "minutes").toString() }
      ],
      d: datetime.create().sub(10, "minutes").toString()
    },
    {
      _id: "d4",
      attachedDocs: [
        { _id: 0, _rev: 1, d: datetime.create().add(10, "minutes").toString() }
      ],
      d: datetime.create().add(10, "minutes").toString()
    }
  ]);

  await Promise.all([
    subtest({ d: { dgt: 0 } }, { d: { dgt: 0 } }, 1),
    subtest({ d: { dgt: 0 } }, { d: { dlt: 0 } }, 1),
    subtest({ d: { dlt: 0 } }, { d: { dgt: 0 } }, 1),
    subtest({ d: { dlt: 0 } }, { d: { dlt: 0 } }, 1)
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
