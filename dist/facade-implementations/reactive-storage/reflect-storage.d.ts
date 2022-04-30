import type { reactiveStorage } from "@skylib/facades";
declare global {
    namespace facades {
        namespace reactiveStorage {
            interface Observer {
                readonly symbol?: symbol;
            }
        }
    }
}
export declare const reflectStorage: reactiveStorage.Facade;
//# sourceMappingURL=reflect-storage.d.ts.map