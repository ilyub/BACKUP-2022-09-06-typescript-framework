import * as testUtils from "@skylib/functions/dist/test-utils";
import { implementations } from "@";
import { uniqueId } from "@skylib/facades";
import { wait } from "@skylib/functions";

const pouchdb = new implementations.database.PouchWrapper();

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("subscribe, unsubscribe", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const handler1 = jest.fn();

    const handler2 = jest.fn();

    const subscription1 = db.subscribe(handler1);

    const subscription2 = db.subscribe(handler2);

    const { id: id1, rev: rev1 } = await db.put({ x: 1 });

    const expected1 = {
      _id: id1,
      _rev: rev1,
      x: 1
    } as const;

    await wait(1000);
    expect(handler1).mockCallsToBe([expected1]);
    expect(handler2).mockCallsToBe([expected1]);

    const { parentId: id2, parentRev: rev2 } = await db.putAttached(id1, {});

    const expected2 = {
      _id: id2,
      _rev: rev2,
      attachedDocs: [],
      lastAttachedDocs: [0],
      x: 1
    } as const;

    await wait(1000);
    expect(handler1).mockCallsToBe([expected2]);
    expect(handler2).mockCallsToBe([expected2]);

    {
      db.unsubscribe(subscription1);
      db.unsubscribe(subscription2);
      await db.put({});
      await wait(1000);
      expect(handler1).mockCallsToBe();
      expect(handler2).mockCallsToBe();
    }
  });
});

test("subscribeAttached, unsubscribeAttached", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = pouchdb.create(uniqueId());

    const id = uniqueId();

    await db.put({ _id: id, x: 1 });

    const handler = jest.fn();

    const subscription = db.subscribeAttached(handler);

    const { parentRev: rev } = await db.putAttached(id, { y: 2 });

    const expected = {
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
    } as const;

    await wait(1000);
    expect(handler).mockCallsToBe([expected]);

    {
      db.unsubscribeAttached(subscription);
      await db.putAttached(id, { y: 2 });
      await wait(1000);
      expect(handler).mockCallsToBe();
    }
  });
});
