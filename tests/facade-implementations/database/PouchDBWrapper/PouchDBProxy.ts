/**
 * @jest-environment @skylib/config/src/jest-env-jsdom
 */
import { uniqueId } from "@skylib/facades/dist/uniqueId";

import { PouchConflictError } from "@/facade-implementations/database/PouchDBWrapper/errors/PouchConflictError";
import { PouchNotFoundError } from "@/facade-implementations/database/PouchDBWrapper/errors/PouchNotFoundError";
import type { PouchPutDocument } from "@/facade-implementations/database/PouchDBWrapper/PouchDBProxy";
import {
  handlers,
  PouchDBProxy
} from "@/facade-implementations/database/PouchDBWrapper/PouchDBProxy";

it("handlers.error", () => {
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

it("PouchDBProxy.bulkDocs", async () => {
  const db = new PouchDBProxy(uniqueId(), {});

  await expect(
    db.bulkDocs(undefined as unknown as PouchPutDocument[])
  ).rejects.toStrictEqual(new Error("Missing JSON list of 'docs'"));
});

it("PouchDBProxy.destroy", async () => {
  const db = new PouchDBProxy(uniqueId(), {});

  await db.destroy();
  await expect(db.destroy()).rejects.toStrictEqual(
    new Error("database is destroyed")
  );
});

it("PouchDBProxy.getDb", async () => {
  const db = new PouchDBProxy(undefined as unknown as string, {});

  await expect(db.get(uniqueId())).rejects.toStrictEqual(
    new Error("Missing/invalid DB name")
  );
});
