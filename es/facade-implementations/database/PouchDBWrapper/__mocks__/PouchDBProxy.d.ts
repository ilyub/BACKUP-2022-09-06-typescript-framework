import type { PouchDatabaseConfiguration } from "../PouchDBProxy";
import { PouchDBProxy as BasePouchDBProxy } from "../PouchDBProxy";
export { handlers } from "../PouchDBProxy";
export declare class PouchDBProxy extends BasePouchDBProxy {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param options - Database options.
     */
    constructor(name: string, options: PouchDatabaseConfiguration);
}
//# sourceMappingURL=PouchDBProxy.d.ts.map