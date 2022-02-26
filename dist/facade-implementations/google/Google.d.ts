/// <reference types="gapi.auth2" />
import type { Facade } from "@skylib/facades/dist/google";
import type { DeepReadonly, PromiseAsync, stringU } from "@skylib/functions/dist/types/core";
export declare class Google implements Facade {
    /**
     * Creates class instance.
     *
     * @param clientId - Client ID.
     */
    constructor(clientId: PromiseAsync<stringU> | stringU);
    idToken(): Promise<stringU>;
    loadSdk(): Promise<void>;
    protected clientId: PromiseAsync<stringU> | stringU;
    protected sdk: Promise<GoogleAuth> | undefined;
}
export declare type GoogleAuth = DeepReadonly<Omit<gapi.auth2.GoogleAuth, "then">>;
//# sourceMappingURL=Google.d.ts.map