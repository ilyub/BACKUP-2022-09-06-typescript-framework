"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
const tslib_1 = require("tslib");
const natural_compare_1 = (0, tslib_1.__importDefault)(require("natural-compare"));
const fn = (0, tslib_1.__importStar)(require("@skylib/functions/dist/function"));
exports.implementation = fn.run(() => {
    function compare(x, y) {
        if (x > y)
            return 1;
        if (x < y)
            return -1;
        return 0;
    }
    compare.strings = natural_compare_1.default;
    return compare;
});
//# sourceMappingURL=natural-compare-wrapper.js.map