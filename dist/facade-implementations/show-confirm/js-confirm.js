"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsConfirm = void 0;
const functions_1 = require("@skylib/functions");
exports.jsConfirm = (0, functions_1.defineFn)(
// eslint-disable-next-line @skylib/require-jsdoc -- Ok
(message, success, failure) => {
    // eslint-disable-next-line no-alert -- Ok
    if (confirm(message))
        success === null || success === void 0 ? void 0 : success();
    else
        failure === null || failure === void 0 ? void 0 : failure();
}, {
    // eslint-disable-next-line @skylib/require-jsdoc, @typescript-eslint/require-await -- Ok
    async: async (message) => 
    // eslint-disable-next-line no-alert -- Ok
    confirm(message)
});
//# sourceMappingURL=js-confirm.js.map