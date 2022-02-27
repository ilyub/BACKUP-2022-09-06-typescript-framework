import pouchdb from "pouchdb";

import type { StoredAttachedDocument } from "@skylib/facades/dist/database";
import { testDelay } from "@skylib/facades/dist/testDelay";
import * as is from "@skylib/functions/dist/guards";
import * as o from "@skylib/functions/dist/object";
import type { DeepReadonly, numbers } from "@skylib/functions/dist/types/core";

import { PouchConflictError } from "./errors/PouchConflictError";
import { PouchNotFoundError } from "./errors/PouchNotFoundError";

export interface Changes {
  /**
   * Cancels changes.
   */
  readonly cancel: () => void;
}

export interface Content {
  readonly [key: string]: unknown;
  readonly attachedDocs?: readonly StoredAttachedDocument[];
  readonly lastAttachedDocs?: numbers;
}

export type PouchChange = DeepReadonly<
  PouchDB.Core.ChangesResponseChange<Content>
>;

export interface PouchChangesHandler {
  /**
   * Changes handler.
   *
   * @param change - Change.
   */
  (change: PouchChange): void;
}

export type PouchChangesOptions = DeepReadonly<PouchDB.Core.ChangesOptions>;

export type PouchDatabaseConfiguration =
  DeepReadonly<PouchDB.Configuration.DatabaseConfiguration>;

export type PouchGetMeta = DeepReadonly<PouchDB.Core.GetMeta>;

export type PouchIdMeta = Readonly<PouchDB.Core.IdMeta>;

export type PouchDatabase = DeepReadonly<PouchDB.Database<Content>>;

export type PouchError = Readonly<PouchDB.Core.Error>;

export type PouchResponse = Readonly<PouchDB.Core.Response>;

export type PouchPutDocument = DeepReadonly<PouchDB.Core.PutDocument<Content>>;

export type PouchQueryOptions = DeepReadonly<
  PouchDB.Query.Options<Content, Content>
>;

export type PouchQueryResponse = DeepReadonly<PouchDB.Query.Response<Content>>;

export const handlers = o.freeze({
  error(error: unknown): void {
    throw wrapPouchError(error);
  }
});

export class PouchDBProxy {
  public db: PouchDatabase;

  /**
   * Creates class instance.
   *
   * @param name - Database name.
   * @param options - Database options.
   */
  public constructor(name: string, options: PouchDatabaseConfiguration) {
    this.db = new pouchdb(name, options);
  }

  /**
   * Creates or updates multiple documents.
   *
   * @param docs - Documents.
   * @returns Responses.
   */
  public async bulkDocs(
    docs: readonly PouchPutDocument[]
  ): Promise<Array<PouchError | PouchResponse>> {
    await testDelay();

    try {
      return await this.db.bulkDocs(o.unfreeze.deep(docs));
    } catch (e) {
      throw wrapPouchError(e);
    }
  }

  /**
   * Subscribes to changes.
   *
   * @param changesHandler - Changes handler.
   * @param options - Options.
   * @returns Subscription ID.
   */
  public changes(
    changesHandler: PouchChangesHandler,
    options: PouchChangesOptions
  ): Changes {
    const changes = this.db
      .changes(o.unfreeze.deep(options))
      .on("change", changesHandler)
      .on("error", handlers.error);

    return {
      cancel(): void {
        changes.cancel();
      }
    };
  }

  /**
   * Destroys database.
   */
  public async destroy(): Promise<void> {
    await testDelay();

    try {
      await this.db.destroy();
    } catch (e) {
      throw wrapPouchError(e);
    }
  }

  /**
   * Fetches document.
   *
   * @param id - ID.
   * @returns Document.
   */
  public async get(id: string): Promise<Content & PouchGetMeta & PouchIdMeta> {
    await testDelay();

    try {
      return await this.db.get(id);
    } catch (e) {
      throw wrapPouchError(e);
    }
  }

  /**
   * Posts document.
   *
   * @param doc - Document.
   * @returns Response.
   */
  public async post(doc: PouchPutDocument): Promise<PouchResponse> {
    await testDelay();

    try {
      return await this.db.post(doc);
    } catch (e) {
      throw wrapPouchError(e);
    }
  }

  /**
   * Puts document.
   *
   * @param doc - Document.
   * @returns Response.
   */
  public async put(doc: PouchPutDocument): Promise<PouchResponse> {
    await testDelay();

    try {
      return await this.db.put(o.unfreeze.deep(doc));
    } catch (e) {
      throw wrapPouchError(e);
    }
  }

  /**
   * Queries database.
   *
   * @param mapReduce - The name of a view in an existing design document.
   * @param options - Options.
   * @returns Query response.
   */
  public async query(
    mapReduce: string,
    options: PouchQueryOptions
  ): Promise<PouchQueryResponse> {
    await testDelay();

    try {
      return await this.db.query(mapReduce, o.unfreeze.deep(options));
    } catch (e) {
      throw wrapPouchError(e);
    }
  }
}

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

interface WrappablePouchError {
  readonly error: true;
  readonly message: string;
  readonly name: string;
  readonly status: number;
}

const isWrappablePouchError: is.Guard<WrappablePouchError> = is.factory(
  is.object.of,
  {
    error: is.true,
    message: is.string,
    name: is.string,
    status: is.number
  },
  {}
);

/**
 * Converts pouch error to conventional error.
 *
 * @param value - Value.
 * @returns Converted pouch error or original value.
 */
function wrapPouchError(value: unknown): unknown {
  if (isWrappablePouchError(value)) {
    if (value.status === 404 && value.name === "not_found")
      return new PouchNotFoundError(value.message);

    if (value.status === 409 && value.name === "conflict")
      return new PouchConflictError(value.message);

    return new Error(value.message);
  }

  return value;
}
