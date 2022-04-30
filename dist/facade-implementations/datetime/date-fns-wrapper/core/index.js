"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleConfig = exports.formatStrings = void 0;
const tslib_1 = require("tslib");
const facades_1 = require("@skylib/facades");
const functions_1 = require("@skylib/functions");
const en_US_1 = tslib_1.__importDefault(require("date-fns/locale/en-US"));
exports.formatStrings = [
    "yyyy-M-d h:m:s a",
    "yyyy-M-d H:m:s",
    "yyyy-M-d h:m a",
    "yyyy-M-d H:m",
    "yyyy-M-d"
];
exports.moduleConfig = (0, functions_1.onDemand)(() => (0, facades_1.reactiveStorage)({
    firstDayOfWeek: 0,
    locale: en_US_1.default,
    pm: true
}));
//# sourceMappingURL=index.js.map