"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = exports.getConfiguration = exports.configure = exports.DateTime = void 0;
const date_fns_1 = require("date-fns");
const DateTime_1 = require("./DateTime");
var DateTime_2 = require("./DateTime");
Object.defineProperty(exports, "DateTime", { enumerable: true, get: function () { return DateTime_2.DateTime; } });
Object.defineProperty(exports, "configure", { enumerable: true, get: function () { return DateTime_2.configure; } });
Object.defineProperty(exports, "getConfiguration", { enumerable: true, get: function () { return DateTime_2.getConfiguration; } });
exports.implementation = {
    create(dt) {
        return new DateTime_1.DateTime(dt);
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
    validate(dt) {
        const now = Date.now();
        return DateTime_1.formatStrings.some(formatString => (0, date_fns_1.isValid)((0, date_fns_1.parse)(dt, formatString, now)));
    }
};
//# sourceMappingURL=index.js.map