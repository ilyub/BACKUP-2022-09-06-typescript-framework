import { assert, fn, is } from "@skylib/functions";
import $ from "jquery";
export class Google {
    /**
     * Creates class instance.
     *
     * @param clientId - Client ID.
     */
    constructor(clientId) {
        Object.defineProperty(this, "clientId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
        Object.defineProperty(this, "sdk", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.clientId = clientId;
    }
    async idToken() {
        const sdk = await this._loadSdk();
        try {
            const user = sdk.isSignedIn.get()
                ? sdk.currentUser.get()
                : await sdk.signIn();
            return user.getAuthResponse().id_token;
        }
        catch (e) {
            if (is.indexedObject(e) && e["error"] === "popup_closed_by_user")
                return undefined;
            throw e;
        }
    }
    async loadSdk() {
        await this._loadSdk();
    }
    /**
     * Loads SDK.
     *
     * @returns SDK.
     */
    async _loadSdk() {
        var _a;
        this.sdk =
            (_a = this.sdk) !== null && _a !== void 0 ? _a : fn.run(async () => {
                await $.getScript("https://apis.google.com/js/api:client.js");
                const clientId = is.callable(this.clientId)
                    ? await this.clientId()
                    : await this.clientId;
                assert.not.empty(clientId, "Missing Google client ID");
                return await new Promise((resolve, reject) => {
                    gapi.load("auth2", () => {
                        // eslint-disable-next-line github/no-then -- Ok
                        gapi.auth2.init({ client_id: clientId }).then(googleAuth => {
                            resolve(googleAuth);
                        }, e => {
                            reject(new Error(`Error ${e.error}: ${e.details}`));
                        });
                    });
                });
            });
        return await this.sdk;
    }
}
//# sourceMappingURL=Google.js.map