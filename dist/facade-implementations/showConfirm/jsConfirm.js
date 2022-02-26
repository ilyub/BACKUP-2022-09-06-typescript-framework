"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
const tslib_1 = require("tslib");
const fn = (0, tslib_1.__importStar)(require("@skylib/functions/dist/function"));
exports.implementation = fn.run(() => {
    function jsConfirm(message, success, failure) {
        // eslint-disable-next-line no-alert
        if (confirm(message))
            success === null || success === void 0 ? void 0 : success();
        else
            failure === null || failure === void 0 ? void 0 : failure();
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    jsConfirm.async = async (message) => 
    // eslint-disable-next-line no-alert
    confirm(message);
    return jsConfirm;
});
//# sourceMappingURL=jsConfirm.js.map