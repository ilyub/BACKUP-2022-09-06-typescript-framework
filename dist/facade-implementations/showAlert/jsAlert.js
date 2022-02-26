"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
const tslib_1 = require("tslib");
const fn = (0, tslib_1.__importStar)(require("@skylib/functions/dist/function"));
exports.implementation = fn.run(() => {
    function jsAlert(message) {
        // eslint-disable-next-line no-alert
        alert(message);
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    jsAlert.async = async (message) => {
        // eslint-disable-next-line no-alert
        alert(message);
    };
    return jsAlert;
});
//# sourceMappingURL=jsAlert.js.map