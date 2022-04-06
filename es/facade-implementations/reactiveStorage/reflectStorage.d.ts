import type { Facade } from "@skylib/facades/es/reactiveStorage";
declare global {
    namespace facades {
        namespace reactiveStorage {
            interface Observer {
                readonly symbol: symbol;
            }
        }
    }
}
export declare const implementation: Facade;
//# sourceMappingURL=reflectStorage.d.ts.map