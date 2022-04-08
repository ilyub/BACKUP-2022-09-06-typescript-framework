import type {
  Database as DatabaseInterface,
  DatabaseOptions,
  Facade
} from "@skylib/facades/dist/database";

import type { Configuration } from "./Database";
import { Database } from "./Database";
import type { PouchDatabaseConfiguration } from "./PouchDBProxy";

export class PouchDBWrapper implements Facade {
  /**
   * Creates class instance.
   *
   * @param config - Configuration.
   * @param pouchConfig - PouchDB configuration.
   */
  public constructor(
    config: Configuration = {},
    pouchConfig: PouchDatabaseConfiguration = {}
  ) {
    this.config = config;
    this.pouchConfig = pouchConfig;
  }

  public create(
    name: string,
    options: DatabaseOptions = {}
  ): DatabaseInterface {
    return new Database(name, options, this.config, this.pouchConfig);
  }

  protected config: Configuration;

  protected pouchConfig: PouchDatabaseConfiguration;
}
