import type { reactiveStorage } from "@skylib/facades";
declare global {
    namespace facades {
        namespace reactiveStorage {
            interface Observer {
                readonly symbol: symbol;
            }
        }
    }
}
export declare const implementation: reactiveStorage.Facade;
//# sourceMappingURL=reflectStorage.d.ts.map