/// <reference types="gapi.auth2" />
import type { Facade } from "@skylib/facades/dist/google";
import type { stringU } from "@skylib/functions/dist/types/core";
import type { AsyncPromise } from "@skylib/functions/dist/types/function";
export declare class Google implements Facade {
    /**
     * Creates class instance.
     *
     * @param clientId - Client ID.
     */
    constructor(clientId: AsyncPromise<stringU> | stringU);
    idToken(): Promise<stringU>;
    loadSdk(): Promise<void>;
    protected clientId: AsyncPromise<stringU> | stringU;
    protected sdk: Promise<GoogleAuth> | undefined;
}
export declare type GoogleAuth = Omit<gapi.auth2.GoogleAuth, "then">;
//# sourceMappingURL=Google.d.ts.map