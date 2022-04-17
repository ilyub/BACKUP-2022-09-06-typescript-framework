"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Google = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const jquery_1 = tslib_1.__importDefault(require("jquery"));
class Google {
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
            value: undefined
        });
        this.clientId = clientId;
    }
    async idToken() {
        try {
            await this.loadSdk();
            functions_1.assert.not.empty(this.sdk);
            const sdk = await this.sdk;
            const user = sdk.isSignedIn.get()
                ? sdk.currentUser.get()
                : await sdk.signIn();
            return user.getAuthResponse().id_token;
        }
        catch (e) {
            if (functions_1.is.object.of(e, { error: functions_1.is.string }, {}) &&
                e.error === "popup_closed_by_user")
                return undefined;
            throw e;
        }
    }
    async loadSdk() {
        var _a;
        this.sdk =
            (_a = this.sdk) !== null && _a !== void 0 ? _a : functions_1.fn.run(async () => {
                await jquery_1.default.getScript("https://apis.google.com/js/api:client.js");
                const clientId = functions_1.is.callable(this.clientId)
                    ? await this.clientId()
                    : await this.clientId;
                functions_1.assert.not.empty(clientId, "Missing Google client ID");
                return await new Promise((resolve, reject) => {
                    gapi.load("auth2", () => {
                        // eslint-disable-next-line github/no-then -- ???
                        gapi.auth2.init({ client_id: clientId }).then(googleAuth => {
                            resolve(googleAuth);
                        }, e => {
                            reject(new Error(`Error ${e.error}: ${e.details}`));
                        });
                    });
                });
            });
        await this.sdk;
    }
}
exports.Google = Google;
//# sourceMappingURL=Google.js.map