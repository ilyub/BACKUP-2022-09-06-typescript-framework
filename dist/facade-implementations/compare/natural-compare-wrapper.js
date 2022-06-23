"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.naturalCompareWrapper = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const natural_compare_1 = tslib_1.__importDefault(require("natural-compare"));
exports.naturalCompareWrapper = (0, functions_1.defineFn)((x, y) => Math.sign(x - y), { strings: natural_compare_1.default });
//# sourceMappingURL=natural-compare-wrapper.js.map