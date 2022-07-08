import * as testUtils from "@skylib/functions/dist/test-utils";
import { database, handlePromise, uniqueId } from "@skylib/facades";
import { implementations } from "@";
import { wait } from "@skylib/functions";

const pouchdb = new implementations.database.PouchWrapper();

testUtils.installFakeTimer({ shouldAdvanceTime: true });

test("exists", async () => {
  const db = pouchdb.create(uniqueId());

  const id1 = uniqueId();

  const id2 = uniqueId();

  await db.put({ _id: id1 });
  await expect(db.exists(id1)).resolves.toBeTrue();
  await expect(db.exists(id2)).resolves.toBeFalse();
});

test("existsAttached", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id });
  await db.putAttached(id, {});
  await expect(db.existsAttached(0, id)).resolves.toBeTrue();
  await expect(db.existsAttached(1, id)).resolves.toBeFalse();
});

test("reactiveExists", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    const result = db.reactiveExists(id);

    {
      expect(result.loaded).toBeFalse();
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
    }

    {
      expect(result.value).toBeFalse();
      await db.put({ _id: id });
      await wait(1000);
      expect(result.value).toBeTrue();
    }
  });
});

test("reactiveExistsAttached", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const id = uniqueId();

    await db.put({ _id: id });

    const result = db.reactiveExistsAttached(0, id);

    {
      expect(result.loaded).toBeFalse();
      await handlePromise.runAll();
      expect(result.loaded).toBeTrue();
    }

    {
      expect(result.value).toBeFalse();
      await db.putAttached(id, {});
      await wait(1000);
      expect(result.value).toBeTrue();
    }
  });
});
