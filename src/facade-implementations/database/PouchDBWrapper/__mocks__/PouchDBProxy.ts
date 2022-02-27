import pouchdb from "pouchdb";

import type { PouchDatabaseConfiguration } from "../PouchDBProxy";
import { PouchDBProxy as BasePouchDBProxy } from "../PouchDBProxy";

export { handlers } from "../PouchDBProxy";

export class PouchDBProxy extends BasePouchDBProxy {
  /**
   * Creates class instance.
   *
   * @param name - Database name.
   * @param options - Database options.
   */
  public constructor(name: string, options: PouchDatabaseConfiguration) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    pouchdb.plugin(require("pouchdb-adapter-memory"));
    super(name, { ...options, adapter: "memory" });
  }
}
