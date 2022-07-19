"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchers = exports.progressToBe = exports.datetimeToBe = void 0;
const tslib_1 = require("tslib");
const testUtils = tslib_1.__importStar(require("@skylib/functions/dist/test-utils"));
const functions_1 = require("@skylib/functions");
const jquery_1 = tslib_1.__importDefault(require("jquery"));
const DateTime_1 = require("../facade-implementations/datetime/date-fns-wrapper/DateTime");
const facades_1 = require("@skylib/facades");
const datetimeToBe = (got, expected) => {
    functions_1.assert.instanceOf(got, DateTime_1.DateTime, "Expecting DateTime instance");
    const gotTime = got.toTime();
    const expectedTime = new Date(expected).getTime();
    return testUtils.buildEqualsResult(gotTime === expectedTime, "Unexpected date", gotTime, expectedTime);
};
exports.datetimeToBe = datetimeToBe;
const progressToBe = (got, expected) => {
    functions_1.assert.string(got, "Expecting string");
    const gotProgress = facades_1.progressReporter.getProgress();
    const classAttrs = gotProgress === 0
        ? new functions_1.ReadonlySet([undefined, ""])
        : new functions_1.ReadonlySet(["progress-bar-active"]);
    const styleAttrs = gotProgress === 0
        ? new functions_1.ReadonlySet([undefined, ""])
        : new functions_1.ReadonlySet([`width: ${100 * gotProgress}%;`]);
    functions_1.assert.toBeTrue(classAttrs.has((0, jquery_1.default)(got).attr("class")), "Unexpected class");
    functions_1.assert.toBeTrue(styleAttrs.has((0, jquery_1.default)(got).attr("style")), "Unexpected style");
    return testUtils.buildEqualsResult(gotProgress === expected, "Unexpected progress", gotProgress, expected);
};
exports.progressToBe = progressToBe;
exports.matchers = { datetimeToBe: exports.datetimeToBe, progressToBe: exports.progressToBe };
//# sourceMappingURL=expect.js.map