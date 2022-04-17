"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const natural_compare_1 = tslib_1.__importDefault(require("natural-compare"));
exports.implementation = functions_1.o.extend((x, y) => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
    if (x > y)
        return 1;
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
    if (x < y)
        return -1;
    return 0;
}, { strings: natural_compare_1.default });
//# sourceMappingURL=natural-compare-wrapper.js.map