import { handlePouchError, wrapPouchError } from "./core";
import { testDelay } from "@skylib/facades";
import { a } from "@skylib/functions";
import pouchdb from "pouchdb";
import type {
  Content,
  PouchChanges,
  PouchChangesHandler,
  PouchChangesOptions,
  PouchDatabase,
  PouchDatabaseConfiguration,
  PouchError,
  PouchGetMeta,
  PouchIdMeta,
  PouchPutDocument,
  PouchPutDocuments,
  PouchQueryOptions,
  PouchQueryResponse,
  PouchResponse
} from "./core";

export class PouchProxy {
  /**
   * Creates class instance.
   *
   * @param name - Database name.
   * @param config - Database configuration.
   */
  public constructor(name: string, config: PouchDatabaseConfiguration) {
    this.db = new pouchdb(name, config);
  }

  /**
   * Creates, updates or deletes multiple documents.
   *
   * @param docs - Documents.
   * @returns Responses.
   */
  public async bulkDocs(
    docs: PouchPutDocuments
  ): Promise<Array<PouchError | PouchResponse>> {
    await testDelay();

    try {
      return await this.db.bulkDocs(a.clone(docs));
    } catch (error) {
      throw wrapPouchError(error);
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
  ): PouchChanges {
    return this.db
      .changes(options)
      .on("change", changesHandler)
      .on("error", handlePouchError);
  }

  /**
   * Destroys database.
   */
  public async destroy(): Promise<void> {
    await testDelay();

    try {
      await this.db.destroy();
    } catch (error) {
      throw wrapPouchError(error);
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
    } catch (error) {
      throw wrapPouchError(error);
    }
  }

  /**
   * Returns original PouchDB database.
   *
   * @returns Original PouchDB database.
   */
  public getRawDb(): PouchDatabase {
    return this.db;
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
    } catch (error) {
      throw wrapPouchError(error);
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
      return await this.db.put(doc);
    } catch (error) {
      throw wrapPouchError(error);
    }
  }

  /**
   * Queries database.
   *
   * @param mapReduce - The name of a view in an existing design document.
   * @param options - Options.
   * @returns Response.
   */
  public async query(
    mapReduce: string,
    options: PouchQueryOptions
  ): Promise<PouchQueryResponse> {
    await testDelay();

    try {
      return await this.db.query(mapReduce, options);
    } catch (error) {
      throw wrapPouchError(error);
    }
  }

  protected readonly db: PouchDatabase;
}
