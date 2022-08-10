/* eslint-disable @skylib/no-at-sign-internal-import -- Ok */
/* eslint-disable @skylib/no-internal-modules -- Ok */

import { PouchProxy } from "@/facade-implementations/database/pouchdb-wrapper/PouchProxy";
import type { PouchPutDocuments } from "@/facade-implementations/database/pouchdb-wrapper/core/types";
import { uniqueId } from "@skylib/facades";

test("bulkDocs", async () => {
  const db = new PouchProxy(uniqueId(), {});

  await expect(
    db.bulkDocs([undefined] as unknown as PouchPutDocuments)
  ).rejects.toStrictEqual(new Error("Document must be a JSON object"));
});

test("destroy", async () => {
  const db = new PouchProxy(uniqueId(), {});

  await db.destroy();
  await expect(db.destroy()).rejects.toStrictEqual(
    new Error("database is destroyed")
  );
});
