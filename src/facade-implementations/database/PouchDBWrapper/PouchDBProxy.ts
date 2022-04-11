import pouchdb from "pouchdb";

import type { BaseStoredAttachedDocuments } from "@skylib/facades/dist/database";
import { testDelay } from "@skylib/facades/dist/testDelay";
import * as is from "@skylib/functions/dist/guards";
import * as o from "@skylib/functions/dist/object";
import type { numbers } from "@skylib/functions/dist/types/core";

import { PouchConflictError } from "./errors/PouchConflictError";
import { PouchNotFoundError } from "./errors/PouchNotFoundError";

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
    // eslint-disable-next-line @skylib/no-mutable-signature, @skylib/prefer-readonly -- ??
    docs: readonly PouchPutDocument[]
  ): Promise<Array<PouchError | PouchResponse>> {
    await testDelay();

    try {
      return await this.db.bulkDocs(o.unfreeze(docs));
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
      .changes(o.unfreeze(options))
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
  // eslint-disable-next-line @skylib/no-mutable-signature, @skylib/prefer-readonly -- ??
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
  // eslint-disable-next-line @skylib/no-mutable-signature, @skylib/prefer-readonly -- ??
  public async put(doc: PouchPutDocument): Promise<PouchResponse> {
    await testDelay();

    try {
      return await this.db.put(o.unfreeze(doc));
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
    // eslint-disable-next-line @skylib/prefer-readonly -- ??
    options: PouchQueryOptions
  ): Promise<PouchQueryResponse> {
    await testDelay();

    try {
      return await this.db.query(mapReduce, o.unfreeze(options));
    } catch (e) {
      throw wrapPouchError(e);
    }
  }
}

export interface Changes {
  /**
   * Cancels changes.
   */
  readonly cancel: () => void;
}

export interface Content {
  readonly [key: string]: unknown;
  readonly attachedDocs?: BaseStoredAttachedDocuments;
  readonly lastAttachedDocs?: numbers;
}

// eslint-disable-next-line @skylib/prefer-readonly -- ??
export type PouchChange = PouchDB.Core.ChangesResponseChange<Content>;

export interface PouchChangesHandler {
  /**
   * Changes handler.
   *
   * @param change - Change.
   */
  // eslint-disable-next-line @skylib/prefer-readonly -- ??
  (change: PouchChange): void;
}

export type PouchChangesOptions = PouchDB.Core.ChangesOptions;

// eslint-disable-next-line @skylib/prefer-readonly -- ??
export type PouchDatabase = PouchDB.Database<Content>;

export type PouchDatabaseConfiguration =
  PouchDB.Configuration.DatabaseConfiguration;

export type PouchError = PouchDB.Core.Error;

export type PouchGetMeta = PouchDB.Core.GetMeta;

export type PouchIdMeta = PouchDB.Core.IdMeta;

// eslint-disable-next-line @skylib/prefer-readonly -- ??
export type PouchPutDocument = PouchDB.Core.PutDocument<Content>;

// eslint-disable-next-line @skylib/prefer-readonly -- ??
export type PouchQueryOptions = PouchDB.Query.Options<Content, Content>;

// eslint-disable-next-line @skylib/prefer-readonly -- ??
export type PouchQueryResponse = PouchDB.Query.Response<Content>;

export type PouchResponse = PouchDB.Core.Response;

const isWrappablePouchError = is.object.factory<WrappablePouchError>(
  {
    error: is.true,
    message: is.string,
    name: is.string,
    status: is.number
  },
  {}
);

interface WrappablePouchError {
  readonly error: true;
  readonly message: string;
  readonly name: string;
  readonly status: number;
}

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
