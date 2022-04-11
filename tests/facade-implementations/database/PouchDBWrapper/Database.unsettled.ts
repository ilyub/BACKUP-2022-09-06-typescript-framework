import type { Conditions } from "@skylib/facades/dist/database";
import { database } from "@skylib/facades/dist/database";
import { datetime } from "@skylib/facades/dist/datetime";
import { uniqueId } from "@skylib/facades/dist/uniqueId";
import { typedef, wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("unsettled", async () => {
  expect.hasAssertions();

  testUtils.clock.setSystemTime(datetime.create("2001-02-14 12:00").toDate());

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    await db.bulkDocs([
      { d: "2001-02-12 12:00" },
      { d: "2001-02-15 11:00" },
      { d: "2001-02-15 13:00" },
      { d: "2001-02-18 12:00" }
    ]);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dateGt: ["now", "+", 1, "day"] } }, 3),
      subtest({ d: { dateLt: ["now", "+", 1, "day"] } }, 3)
    ]);

    await wait(49.5 * 3600 * 1000);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dateGt: ["now", "+", 1, "day"] } }, 2),
      subtest({ d: { dateLt: ["now", "+", 1, "day"] } }, 2)
    ]);

    await wait(2 * 3600 * 1000);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dateGt: ["now", "+", 1, "day"] } }, 1),
      subtest({ d: { dateLt: ["now", "+", 1, "day"] } }, 1)
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

  testUtils.clock.setSystemTime(datetime.create("2001-02-16 12:00").toDate());

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    await db.bulkDocs(
      typedef([
        {
          attachedDocs: [
            {
              _id: 0,
              _rev: 1,
              d: "2001-02-12 12:00"
            }
          ]
        },
        {
          attachedDocs: [
            {
              _id: 0,
              _rev: 1,
              d: "2001-02-15 11:00"
            }
          ]
        },
        {
          attachedDocs: [
            {
              _id: 0,
              _rev: 1,
              d: "2001-02-15 13:00"
            }
          ]
        },
        {
          attachedDocs: [
            {
              _id: 0,
              _rev: 1,
              d: "2001-02-18 12:00"
            }
          ]
        }
      ])
    );

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dateGt: ["now", "-", 1, "day"] } }, 3),
      subtest({ d: { dateLt: ["now", "-", 1, "day"] } }, 3)
    ]);

    await wait(49.5 * 3600 * 1000);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dateGt: ["now", "-", 1, "day"] } }, 2),
      subtest({ d: { dateLt: ["now", "-", 1, "day"] } }, 2)
    ]);

    await wait(2 * 3600 * 1000);

    await Promise.all([
      subtest(undefined, 0),
      subtest({ d: { dateGt: ["now", "-", 1, "day"] } }, 1),
      subtest({ d: { dateLt: ["now", "-", 1, "day"] } }, 1)
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

  testUtils.clock.setSystemTime(datetime.create("2001-02-15 12:00").toDate());

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    await db.bulkDocs(
      typedef([
        {
          attachedDocs: [
            {
              _id: 0,
              _rev: 1,
              d: "2001-02-12 12:00"
            },
            {
              _id: 1,
              _rev: 1,
              d: "2001-02-15 11:00"
            },
            {
              _id: 2,
              _rev: 1,
              d: "2001-02-15 13:00"
            },
            {
              _id: 3,
              _rev: 1,
              d: "2001-02-18 12:00"
            }
          ],
          d: "2001-02-12 12:00"
        },
        {
          attachedDocs: [
            {
              _id: 0,
              _rev: 1,
              d: "2001-02-12 12:00"
            },
            {
              _id: 1,
              _rev: 1,
              d: "2001-02-15 11:00"
            },
            {
              _id: 2,
              _rev: 1,
              d: "2001-02-15 13:00"
            },
            {
              _id: 3,
              _rev: 1,
              d: "2001-02-18 12:00"
            }
          ],
          d: "2001-02-15 11:00"
        },
        {
          attachedDocs: [
            {
              _id: 0,
              _rev: 1,
              d: "2001-02-12 12:00"
            },
            {
              _id: 1,
              _rev: 1,
              d: "2001-02-15 11:00"
            },
            {
              _id: 2,
              _rev: 1,
              d: "2001-02-15 13:00"
            },
            {
              _id: 3,
              _rev: 1,
              d: "2001-02-18 12:00"
            }
          ],
          d: "2001-02-15 13:00"
        },
        {
          attachedDocs: [
            {
              _id: 0,
              _rev: 1,
              d: "2001-02-12 12:00"
            },
            {
              _id: 1,
              _rev: 1,
              d: "2001-02-15 11:00"
            },
            {
              _id: 2,
              _rev: 1,
              d: "2001-02-15 13:00"
            },
            {
              _id: 3,
              _rev: 1,
              d: "2001-02-18 12:00"
            }
          ],
          d: "2001-02-18 12:00"
        }
      ])
    );

    await Promise.all([
      subtest({ d: { dateGt: ["now"] } }, { d: { dateGt: ["now"] } }, 9),
      subtest({ d: { dateGt: ["now"] } }, { d: { dateLt: ["now"] } }, 12),
      subtest({ d: { dateLt: ["now"] } }, { d: { dateGt: ["now"] } }, 12),
      subtest({ d: { dateLt: ["now"] } }, { d: { dateLt: ["now"] } }, 15)
    ]);

    await wait(49.5 * 3600 * 1000);

    await Promise.all([
      subtest({ d: { dateGt: ["now"] } }, { d: { dateGt: ["now"] } }, 4),
      subtest({ d: { dateGt: ["now"] } }, { d: { dateLt: ["now"] } }, 8),
      subtest({ d: { dateLt: ["now"] } }, { d: { dateGt: ["now"] } }, 8),
      subtest({ d: { dateLt: ["now"] } }, { d: { dateLt: ["now"] } }, 12)
    ]);

    await wait(2 * 3600 * 1000);

    await Promise.all([
      subtest({ d: { dateGt: ["now"] } }, { d: { dateGt: ["now"] } }, 1),
      subtest({ d: { dateGt: ["now"] } }, { d: { dateLt: ["now"] } }, 4),
      subtest({ d: { dateLt: ["now"] } }, { d: { dateGt: ["now"] } }, 4),
      subtest({ d: { dateLt: ["now"] } }, { d: { dateLt: ["now"] } }, 7)
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
