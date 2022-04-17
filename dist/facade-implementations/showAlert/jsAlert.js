"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
const functions_1 = require("@skylib/functions");
exports.implementation = functions_1.o.extend((message) => {
    // eslint-disable-next-line no-alert -- ???
    alert(message);
}, {
    // eslint-disable-next-line @typescript-eslint/require-await -- ???
    async async(message) {
        // eslint-disable-next-line no-alert -- ???
        alert(message);
    }
});
//# sourceMappingURL=jsAlert.js.map