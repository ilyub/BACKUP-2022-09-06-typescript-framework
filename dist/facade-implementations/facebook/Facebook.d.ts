import type { facebook } from "@skylib/facades";
import type { stringU, AsyncPromise } from "@skylib/functions";
export declare class Facebook implements facebook.Facade {
    /**
     * Creates class instance.
     *
     * @param appId - App ID.
     * @param version - Version.
     */
    constructor(appId: AsyncPromise<stringU> | stringU, version: string);
    accessToken(): Promise<stringU>;
    loadSdk(): Promise<void>;
    protected readonly appId: AsyncPromise<stringU> | stringU;
    protected sdk: Promise<void> | undefined;
    protected readonly version: string;
}
//# sourceMappingURL=Facebook.d.ts.map