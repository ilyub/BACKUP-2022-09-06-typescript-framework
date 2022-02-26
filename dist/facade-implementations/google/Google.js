"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Google = void 0;
const tslib_1 = require("tslib");
const jquery_1 = (0, tslib_1.__importDefault)(require("jquery"));
const assert = (0, tslib_1.__importStar)(require("@skylib/functions/dist/assertions"));
const fn = (0, tslib_1.__importStar)(require("@skylib/functions/dist/function"));
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
class Google {
    /**
     * Creates class instance.
     *
     * @param clientId - Client ID.
     */
    constructor(clientId) {
        /*
        |*****************************************************************************
        |* Protected
        |*****************************************************************************
        |*/
        Object.defineProperty(this, "clientId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
            assert.not.empty(this.sdk);
            const sdk = await this.sdk;
            const user = sdk.isSignedIn.get()
                ? sdk.currentUser.get()
                : await sdk.signIn();
            return user.getAuthResponse().id_token;
        }
        catch (e) {
            if (is.object.of(e, { error: is.string }, {}) &&
                e.error === "popup_closed_by_user")
                return undefined;
            throw e;
        }
    }
    async loadSdk() {
        var _a;
        this.sdk =
            (_a = this.sdk) !== null && _a !== void 0 ? _a : fn.run(async () => {
                await jquery_1.default.getScript("https://apis.google.com/js/api:client.js");
                const clientId = is.callable(this.clientId)
                    ? await this.clientId()
                    : await this.clientId;
                assert.not.empty(clientId, "Missing Google client ID");
                return new Promise((resolve, reject) => {
                    gapi.load("auth2", () => {
                        // eslint-disable-next-line github/no-then, promise/prefer-await-to-then
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