import { PouchProxy } from "@/facade-implementations/database/pouchdb-wrapper/PouchProxy";
import { uniqueId } from "@skylib/facades";
import type { PouchPutDocuments } from "@/facade-implementations/database/pouchdb-wrapper/core/types";

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
