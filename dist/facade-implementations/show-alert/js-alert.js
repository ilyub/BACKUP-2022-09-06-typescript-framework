"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsAlert = void 0;
const functions_1 = require("@skylib/functions");
exports.jsAlert = (0, functions_1.defineFn)((message) => {
    // eslint-disable-next-line no-alert -- Ok
    alert(message);
}, {
    // eslint-disable-next-line @typescript-eslint/require-await -- Ok
    async async(message) {
        // eslint-disable-next-line no-alert -- Ok
        alert(message);
    }
});
//# sourceMappingURL=js-alert.js.map