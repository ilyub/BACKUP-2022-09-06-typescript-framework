import { PouchProxy as BasePouchDBProxy } from "../PouchProxy";
import type { PouchDatabaseConfiguration } from "../core";
import pouchdb from "pouchdb";

export class PouchProxy extends BasePouchDBProxy {
  /**
   * Creates class instance.
   *
   * @param name - Database name.
   * @param config - Database configuration.
   */
  public constructor(name: string, config: PouchDatabaseConfiguration) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Ok
    const plugin = require("pouchdb-adapter-memory");

    pouchdb.plugin(plugin);
    super(name, { ...config, adapter: "memory" });
  }
}
