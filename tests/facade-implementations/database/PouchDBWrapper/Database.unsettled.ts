import type { Conditions } from "@skylib/facades/dist/database";
import { database } from "@skylib/facades/dist/database";
import { datetime } from "@skylib/facades/dist/datetime";
import { uniqueId } from "@skylib/facades/dist/uniqueId";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("unsettled", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    await db.bulkDocs([
      { d: datetime.create().sub(2, "days").toString() },
      { d: datetime.create().sub(1, "hour").toString() },
      { d: datetime.create().add(1, "hour").toString() },
      { d: datetime.create().add(2, "days").toString() }
    ]);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dgt: 0 } }, 3),
      subtest({ d: { dlt: 0 } }, 3)
    ]);

    await wait(24.5 * 3600 * 1000);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dgt: 0 } }, 2),
      subtest({ d: { dlt: 0 } }, 2)
    ]);

    await wait(2 * 3600 * 1000);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dgt: 0 } }, 1),
      subtest({ d: { dlt: 0 } }, 1)
    ]);

    async function subtest(
      conditions: Conditions | undefined,
      expected: number
    ): Promise<void> {
      await db.query(conditions);
      await expect(db.unsettled(conditions)).resolves.toStrictEqual(expected);
    }
  });
});

test("unsettledAttached", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    await db.bulkDocs([
      {
        attachedDocs: [
          { _id: 0, _rev: 1, d: datetime.create().sub(2, "days").toString() }
        ]
      },
      {
        attachedDocs: [
          { _id: 0, _rev: 1, d: datetime.create().sub(1, "hour").toString() }
        ]
      },
      {
        attachedDocs: [
          { _id: 0, _rev: 1, d: datetime.create().add(1, "hour").toString() }
        ]
      },
      {
        attachedDocs: [
          { _id: 0, _rev: 1, d: datetime.create().add(2, "days").toString() }
        ]
      }
    ]);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dgt: 0 } }, 3),
      subtest({ d: { dlt: 0 } }, 3)
    ]);

    await wait(24.5 * 3600 * 1000);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dgt: 0 } }, 2),
      subtest({ d: { dlt: 0 } }, 2)
    ]);

    await wait(2 * 3600 * 1000);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dgt: 0 } }, 1),
      subtest({ d: { dlt: 0 } }, 1)
    ]);

    async function subtest(
      conditions: Conditions | undefined,
      expected: number
    ): Promise<void> {
      await db.queryAttached(conditions);
      await expect(db.unsettledAttached(conditions)).resolves.toStrictEqual(
        expected
      );
    }
  });
});

test("unsettledAttached: Combined", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    await db.bulkDocs([
      {
        attachedDocs: [
          { _id: 0, _rev: 1, d: datetime.create().sub(2, "days").toString() },
          { _id: 1, _rev: 1, d: datetime.create().sub(1, "hour").toString() },
          { _id: 2, _rev: 1, d: datetime.create().add(1, "hour").toString() },
          { _id: 3, _rev: 1, d: datetime.create().add(2, "days").toString() }
        ],
        d: datetime.create().sub(2, "days").toString()
      },
      {
        attachedDocs: [
          { _id: 0, _rev: 1, d: datetime.create().sub(2, "days").toString() },
          { _id: 1, _rev: 1, d: datetime.create().sub(1, "hour").toString() },
          { _id: 2, _rev: 1, d: datetime.create().add(1, "hour").toString() },
          { _id: 3, _rev: 1, d: datetime.create().add(2, "days").toString() }
        ],
        d: datetime.create().sub(1, "hour").toString()
      },
      {
        attachedDocs: [
          { _id: 0, _rev: 1, d: datetime.create().sub(2, "days").toString() },
          { _id: 1, _rev: 1, d: datetime.create().sub(1, "hour").toString() },
          { _id: 2, _rev: 1, d: datetime.create().add(1, "hour").toString() },
          { _id: 3, _rev: 1, d: datetime.create().add(2, "days").toString() }
        ],
        d: datetime.create().add(1, "hour").toString()
      },
      {
        attachedDocs: [
          { _id: 0, _rev: 1, d: datetime.create().sub(2, "days").toString() },
          { _id: 1, _rev: 1, d: datetime.create().sub(1, "hour").toString() },
          { _id: 2, _rev: 1, d: datetime.create().add(1, "hour").toString() },
          { _id: 3, _rev: 1, d: datetime.create().add(2, "days").toString() }
        ],
        d: datetime.create().add(2, "days").toString()
      }
    ]);

    await Promise.all([
      subtest({ d: { dgt: 0 } }, { d: { dgt: 0 } }, 9),
      subtest({ d: { dgt: 0 } }, { d: { dlt: 0 } }, 12),
      subtest({ d: { dlt: 0 } }, { d: { dgt: 0 } }, 12),
      subtest({ d: { dlt: 0 } }, { d: { dlt: 0 } }, 15)
    ]);

    await wait(24.5 * 3600 * 1000);

    await Promise.all([
      subtest({ d: { dgt: 0 } }, { d: { dgt: 0 } }, 4),
      subtest({ d: { dgt: 0 } }, { d: { dlt: 0 } }, 8),
      subtest({ d: { dlt: 0 } }, { d: { dgt: 0 } }, 8),
      subtest({ d: { dlt: 0 } }, { d: { dlt: 0 } }, 12)
    ]);

    await wait(2 * 3600 * 1000);

    await Promise.all([
      subtest({ d: { dgt: 0 } }, { d: { dgt: 0 } }, 1),
      subtest({ d: { dgt: 0 } }, { d: { dlt: 0 } }, 4),
      subtest({ d: { dlt: 0 } }, { d: { dgt: 0 } }, 4),
      subtest({ d: { dlt: 0 } }, { d: { dlt: 0 } }, 7)
    ]);

    async function subtest(
      conditions: Conditions,
      parentConditions: Conditions,
      expected: number
    ): Promise<void> {
      await db.queryAttached(conditions, parentConditions);
      await expect(
        db.unsettledAttached(conditions, parentConditions)
      ).resolves.toStrictEqual(expected);
    }
  });
});
