import * as testUtils from "@skylib/functions/dist/test-utils";
import { fn, wait } from "@skylib/functions";
import type { database } from "@skylib/facades";
import { implementations } from "@";
import { uniqueId } from "@skylib/facades";
import type { unknowns } from "@skylib/functions";

type arrays = readonly unknowns[];

const pouchdb = new implementations.database.PouchWrapper();

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test.each([
  {
    expected: (id: string, rev: string): arrays => [
      [{ _id: id, _rev: rev, x: 1 }]
    ],
    subtest: fn.noop
  },
  {
    expected: (): arrays => [],
    subtest: (subscription: database.SubscriptionId, db: database.Database) => {
      db.unsubscribe(subscription);
    }
  }
])("subscribe, unsubscribe", async ({ expected, subtest }) => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const handler = jest.fn();

    subtest(db.subscribe(handler), db);

    const { id, rev } = await db.put({ x: 1 });

    await wait(1000);
    expect(handler).mockCallsToBe(...expected(id, rev));
    db.subscribe(fn.noop);
  });
});

test.each([
  {
    expected: (id: string, rev: string): arrays => [
      [
        {
          _id: 0,
          _rev: 1,
          parentDoc: {
            _id: id,
            _rev: rev,
            attachedDocs: [],
            lastAttachedDocs: [0],
            x: 1
          },
          y: 2
        }
      ]
    ],
    subtest: fn.noop
  },
  {
    expected: (): arrays => [],
    subtest: (
      subscription: database.AttachedSubscriptionId,
      db: database.Database
    ) => {
      db.unsubscribeAttached(subscription);
    }
  }
])("subscribeAttached, unsubscribeAttached", async ({ expected, subtest }) => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const handler = jest.fn();

    subtest(db.subscribeAttached(handler), db);

    const id = uniqueId();

    await db.put({ _id: id, x: 1 });

    const { parentRev: rev } = await db.putAttached(id, { y: 2 });

    await wait(1000);
    expect(handler).mockCallsToBe(...expected(id, rev));
    db.subscribeAttached(fn.noop);
  });
});
