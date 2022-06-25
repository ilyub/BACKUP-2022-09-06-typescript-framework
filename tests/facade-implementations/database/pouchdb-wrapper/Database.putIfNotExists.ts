import { implementations } from "@";
import { uniqueId } from "@skylib/facades";
import { as } from "@skylib/functions";

const pouchdb = new implementations.database.PouchWrapper();

test("putIfNotExists", async () => {
  const db = pouchdb.create(uniqueId());

  const response1 = as.not.empty(await db.putIfNotExists({}));

  expect(response1).toContainAllKeys(["id", "rev"]);
  expect(response1.rev).toStartWith("1-");

  const response2 = as.not.empty(
    await db.putIfNotExists({ _id: response1.id, _rev: response1.rev })
  );

  expect(response2).toContainAllKeys(["id", "rev"]);
  expect(response2.rev).toStartWith("2-");

  {
    await expect(
      db.putIfNotExists({ _id: response2.id })
    ).resolves.toBeUndefined();
  }
});

test("putIfNotExistsAttached", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id });

  const response1 = as.not.empty(await db.putIfNotExistsAttached(id, {}));

  expect(response1).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response1.id).toBe(0);
  expect(response1.rev).toBe(1);

  const response2 = as.not.empty(
    await db.putIfNotExistsAttached(id, { _id: 0, _rev: 1 })
  );

  expect(response2).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response2.id).toBe(0);
  expect(response2.rev).toBe(2);

  {
    await expect(
      db.putIfNotExistsAttached(id, { _id: 0 })
    ).resolves.toBeUndefined();
  }
});
