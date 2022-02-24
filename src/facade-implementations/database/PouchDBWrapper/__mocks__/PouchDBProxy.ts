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
    super(name, { ...options, adapter: "memory" });
  }

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  protected override async getPouchDBConstructor(): Promise<PouchDB.Static> {
    const pouchDBConstructor = await super.getPouchDBConstructor();

    const pouchdbAdapterMemory = await import(
      /* webpackChunkName: "pouchdb-adapter-memory" */
      "pouchdb-adapter-memory"
    );

    pouchDBConstructor.plugin(pouchdbAdapterMemory.default);

    return pouchDBConstructor;
  }
}
