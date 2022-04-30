/// <reference types="gapi.auth2" />
import type { google } from "@skylib/facades";
import type { stringU, AsyncPromise } from "@skylib/functions";
export declare class Google implements google.Facade {
    /**
     * Creates class instance.
     *
     * @param clientId - Client ID.
     */
    constructor(clientId: AsyncPromise<stringU> | stringU);
    idToken(): Promise<stringU>;
    loadSdk(): Promise<void>;
    protected readonly clientId: AsyncPromise<stringU> | stringU;
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