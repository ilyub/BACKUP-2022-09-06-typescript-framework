/* eslint jest/max-expects: [warn, { max: 7 }] -- Ok */

import { as } from "@skylib/functions";
import type { database } from "@skylib/facades";
import { implementations } from "@";
import { uniqueId } from "@skylib/facades";

const pouchdb = new implementations.database.PouchWrapper();

test("putIfNotExists", async () => {
  const db = pouchdb.create(uniqueId());

  const { id, rev: rev1 } = as.not.empty(await db.putIfNotExists({}));

  expect(rev1).toStartWith("1-");

  const doc: database.PutDocument = { _id: id, _rev: rev1 };

  const { rev: rev2 } = as.not.empty(await db.putIfNotExists(doc));

  expect(rev2).toStartWith("2-");
  await expect(db.putIfNotExists(doc)).resolves.toBeUndefined();
});

test("putIfNotExistsAttached", async () => {
  const db = pouchdb.create(uniqueId());

  const id = uniqueId();

  await db.put({ _id: id });

  const response1 = as.not.empty(await db.putIfNotExistsAttached(id, {}));

  expect(response1).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response1.id).toBe(0);
  expect(response1.rev).toBe(1);

  const doc: database.PutAttachedDocument = { _id: 0, _rev: 1 };

  const response2 = as.not.empty(await db.putIfNotExistsAttached(id, doc));

  expect(response2).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response2.id).toBe(0);
  expect(response2.rev).toBe(2);
  await expect(db.putIfNotExistsAttached(id, doc)).resolves.toBeUndefined();
});
