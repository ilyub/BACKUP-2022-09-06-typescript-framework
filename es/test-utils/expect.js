import * as testUtils from "@skylib/functions/dist/test-utils";
import { ReadonlySet, assert } from "@skylib/functions";
import $ from "jquery";
import { DateTime } from "../facade-implementations/datetime/date-fns-wrapper/DateTime";
import { progressReporter } from "@skylib/facades";
export const datetimeToBe = (got, expected) => {
    assert.instanceOf(got, DateTime, "Expecting DateTime instance");
    const gotTime = got.toTime();
    const expectedTime = new Date(expected).getTime();
    return testUtils.buildEqualsResult(gotTime === expectedTime, "Unexpected date", gotTime, expectedTime);
};
export const progressToBe = (got, expected) => {
    assert.string(got, "Expecting string");
    const gotProgress = progressReporter.getProgress();
    const classAttrs = gotProgress === 0
        ? new ReadonlySet([undefined, ""])
        : new ReadonlySet(["progress-bar-active"]);
    const styleAttrs = gotProgress === 0
        ? new ReadonlySet([undefined, ""])
        : new ReadonlySet([`width: ${100 * gotProgress}%;`]);
    assert.toBeTrue(classAttrs.has($(got).attr("class")), "Unexpected class");
    assert.toBeTrue(styleAttrs.has($(got).attr("style")), "Unexpected style");
    return testUtils.buildEqualsResult(gotProgress === expected, "Unexpected progress", gotProgress, expected);
};
export const matchers = { datetimeToBe, progressToBe };
//# sourceMappingURL=expect.js.map