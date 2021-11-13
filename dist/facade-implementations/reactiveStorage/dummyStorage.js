"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
const tslib_1 = require("tslib");
const fn = (0, tslib_1.__importStar)(require("@skylib/functions/dist/function"));
exports.implementation = fn.run(() => {
    function dummyStorage(data) {
        return data;
    }
    dummyStorage.withChangesHandler = (data) => data;
    return dummyStorage;
});
//# sourceMappingURL=dummyStorage.js.map