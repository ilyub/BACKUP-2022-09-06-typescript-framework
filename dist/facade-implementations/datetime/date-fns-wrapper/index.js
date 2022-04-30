"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFnsWrapper = void 0;
const DateTime_1 = require("./DateTime");
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
const date_fns_1 = require("date-fns");
exports.dateFnsWrapper = {
    DateTime: DateTime_1.DateTime,
    configure(config) {
        functions_1.o.assign(core_1.moduleConfig, config);
    },
    create(date) {
        return new DateTime_1.DateTime(date);
    },
    getConfiguration() {
        return core_1.moduleConfig;
    },
    now() {
        return new DateTime_1.DateTime().toString();
    },
    time() {
        return Date.now();
    },
    timeSec() {
        return Date.now() / 1000;
    },
    validate(date) {
        const now = Date.now();
        return core_1.formatStrings.some(formatString => (0, date_fns_1.isValid)((0, date_fns_1.parse)(date, formatString, now)));
    }
};
//# sourceMappingURL=index.js.map