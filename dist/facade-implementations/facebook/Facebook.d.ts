import type { Facade } from "@skylib/facades/dist/facebook";
import type { stringU } from "@skylib/functions/dist/types/core";
import type { AsyncPromise } from "@skylib/functions/dist/types/function";
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