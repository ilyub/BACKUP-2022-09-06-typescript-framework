import { uniqueId } from "@skylib/facades";
import { implementations } from "@";
// eslint-disable-next-line import/no-internal-modules -- Ok
import type { PouchPutDocument } from "@/facade-implementations/database/PouchDBWrapper/PouchDBProxy";
import {
  handlers,
  PouchDBProxy
  // eslint-disable-next-line import/no-internal-modules -- Ok
} from "@/facade-implementations/database/PouchDBWrapper/PouchDBProxy";

const PouchConflictError =
  implementations.database.PouchDBWrapper.PouchConflictError;

const PouchNotFoundError =
  implementations.database.PouchDBWrapper.PouchNotFoundError;

test("handlers.error", () => {
  {
    const error = new Error("Sample error");

    expect(() => {
      handlers.error(error);
    }).toThrow(error);
  }

  {
    const error = {
      error: true,
      message: "message",
      name: "not_found",
      status: 404
    };

    expect(() => {
      handlers.error(error);
    }).toThrow(new PouchNotFoundError("message"));
  }

  {
    const error = {
      error: true,
      message: "message",
      name: "conflict",
      status: 409
    };

    expect(() => {
      handlers.error(error);
    }).toThrow(new PouchConflictError("message"));
  }
});

test("pouchDBProxy.bulkDocs", async () => {
  const db = new PouchDBProxy(uniqueId(), {});

  await expect(
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
    db.bulkDocs(undefined as unknown as PouchPutDocument[])
  ).rejects.toStrictEqual(new Error("Missing JSON list of 'docs'"));
});

test("pouchDBProxy.destroy", async () => {
  const db = new PouchDBProxy(uniqueId(), {});

  await db.destroy();
  await expect(db.destroy()).rejects.toStrictEqual(
    new Error("database is destroyed")
  );
});
