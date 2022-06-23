import { DateTime } from "../facade-implementations/datetime/date-fns-wrapper/DateTime";
import { progressReporter } from "@skylib/facades";
import { assert } from "@skylib/functions";
import $ from "jquery";
export const datetimeToBe = (got, expected) => {
    assert.instance(got, DateTime);
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
export const progressToBe = (got, expected) => {
    assert.string(got);
    const gotProgress = progressReporter.getProgress();
    const classOptions = gotProgress === 0
        ? new Set([undefined, ""])
        : new Set(["progress-bar-active"]);
    const styleOptions = gotProgress === 0
        ? new Set([undefined, ""])
        : new Set([`width: ${100 * progressReporter.getProgress()}%;`]);
    return gotProgress === expected &&
        classOptions.has($(got).attr("class")) &&
        styleOptions.has($(got).attr("style"))
        ? {
            message: () => `Expected progress not to be ${expected}`,
            pass: true
        }
        : {
            message: () => `Expected progress (${gotProgress}) to be ${expected}`,
            pass: false
        };
};
export const matchers = { datetimeToBe, progressToBe };
//# sourceMappingURL=expect.js.map