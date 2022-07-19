import type { stringU, types } from "@skylib/functions";
import type { facebook } from "@skylib/facades";
export declare class Facebook implements facebook.Facade {
    /**
     * Creates class instance.
     *
     * @param appId - App ID.
     * @param version - Version.
     */
    constructor(appId: stringU | types.fn.AsyncPromise<stringU>, version: string);
    accessToken(): Promise<stringU>;
    loadSdk(): Promise<void>;
    protected readonly appId: stringU | types.fn.AsyncPromise<stringU>;
    protected sdk: Promise<void> | undefined;
    protected readonly version: string;
}
//# sourceMappingURL=Facebook.d.ts.map