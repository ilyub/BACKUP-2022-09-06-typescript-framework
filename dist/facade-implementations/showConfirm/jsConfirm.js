"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
const functions_1 = require("@skylib/functions");
exports.implementation = functions_1.o.extend((message, success, failure) => {
    // eslint-disable-next-line no-alert -- ???
    if (confirm(message))
        success === null || success === void 0 ? void 0 : success();
    else
        failure === null || failure === void 0 ? void 0 : failure();
}, {
    // eslint-disable-next-line @typescript-eslint/require-await -- ???
    async: async (message) => 
    // eslint-disable-next-line no-alert -- ???
    confirm(message)
});
//# sourceMappingURL=jsConfirm.js.map