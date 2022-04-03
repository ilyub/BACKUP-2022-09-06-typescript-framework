import type { Facade } from "@skylib/facades/es/facebook";
import type { stringU } from "@skylib/functions/es/types/core";
import type { AsyncPromise } from "@skylib/functions/es/types/function";
export declare class Facebook implements Facade {
    /**
     * Creates class instance.
     *
     * @param appId - Facebook app ID.
     * @param version - Version.
     */
    constructor(appId: AsyncPromise<stringU> | stringU, version: string);
    accessToken(): Promise<stringU>;
    loadSdk(): Promise<void>;
    protected appId: AsyncPromise<stringU> | stringU;
    protected sdk: Promise<void> | undefined;
    protected version: string;
}
//# sourceMappingURL=Facebook.d.ts.map