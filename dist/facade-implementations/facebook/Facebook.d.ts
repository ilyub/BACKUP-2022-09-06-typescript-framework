import type { Facade } from "@skylib/facades/dist/facebook";
import type { PromiseAsync, stringU } from "@skylib/functions/dist/types/core";
export declare class Facebook implements Facade {
    /**
     * Creates class instance.
     *
     * @param appId - Facebook app ID.
     * @param version - Version.
     */
    constructor(appId: stringU | PromiseAsync<stringU>, version: string);
    accessToken(): Promise<stringU>;
    loadSdk(): Promise<void>;
    protected appId: stringU | PromiseAsync<stringU>;
    protected sdk: Promise<void> | undefined;
    protected version: string;
}
//# sourceMappingURL=Facebook.d.ts.map