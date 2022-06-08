"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchers = exports.progressToBe = exports.datetimeToBe = void 0;
const tslib_1 = require("tslib");
// eslint-disable-next-line import/no-internal-modules -- Ok
const DateTime_1 = require("../facade-implementations/datetime/date-fns-wrapper/DateTime");
const facades_1 = require("@skylib/facades");
const functions_1 = require("@skylib/functions");
const jquery_1 = tslib_1.__importDefault(require("jquery"));
const datetimeToBe = (got, expected) => {
    functions_1.assert.instance(got, DateTime_1.DateTime);
    return got.toTime() === new Date(expected).getTime()
        ? {
            message: () => `Expected date not to be "${expected}"`,
            pass: true
        }
        : {
            message: () => `Expected date ("${got.toString()}") to be "${expected}"`,
            pass: false
        };
};
exports.datetimeToBe = datetimeToBe;
const progressToBe = (got, expected) => {
    functions_1.assert.string(got);
    const gotProgress = facades_1.progressReporter.getProgress();
    const classOptions = gotProgress === 0
        ? new Set([undefined, ""])
        : new Set(["progress-bar-active"]);
    const styleOptions = gotProgress === 0
        ? new Set([undefined, ""])
        : new Set([`width: ${100 * facades_1.progressReporter.getProgress()}%;`]);
    return gotProgress === expected &&
        classOptions.has((0, jquery_1.default)(got).attr("class")) &&
        styleOptions.has((0, jquery_1.default)(got).attr("style"))
        ? {
            message: () => `Expected progress not to be ${expected}`,
            pass: true
        }
        : {
            message: () => `Expected progress (${gotProgress}) to be ${expected}`,
            pass: false
        };
};
exports.progressToBe = progressToBe;
exports.matchers = { datetimeToBe: exports.datetimeToBe, progressToBe: exports.progressToBe };
//# sourceMappingURL=expect.js.map