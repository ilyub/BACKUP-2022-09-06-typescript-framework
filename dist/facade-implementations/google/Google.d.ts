/// <reference types="gapi.auth2" />
import type { stringU, types } from "@skylib/functions";
import type { google } from "@skylib/facades";
export declare class Google implements google.Facade {
    /**
     * Creates class instance.
     *
     * @param clientId - Client ID.
     */
    constructor(clientId: stringU | types.fn.AsyncPromise<stringU>);
    idToken(): Promise<stringU>;
    loadSdk(): Promise<void>;
    protected readonly clientId: stringU | types.fn.AsyncPromise<stringU>;
    protected sdk: Promise<Google.Auth> | undefined;
    /**
     * Loads SDK.
     *
     * @returns SDK.
     */
    protected _loadSdk(): Promise<Google.Auth>;
}
export declare namespace Google {
    interface Auth extends Omit<gapi.auth2.GoogleAuth, "then"> {
    }
}
//# sourceMappingURL=Google.d.ts.map