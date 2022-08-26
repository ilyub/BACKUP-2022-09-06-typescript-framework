import * as testUtils from "@skylib/functions/dist/test-utils";
import { ReadonlySet, assert } from "@skylib/functions";
import $ from "jquery";
import { DateTime } from "../facade-implementations/datetime/date-fns-wrapper/DateTime";
import { progressReporter } from "@skylib/facades";

export const datetimeToBe: testUtils.ExpectFromMatcher<"datetimeToBe"> = (
  got: unknown,
  expected: string
): testUtils.ExpectResult => {
  assert.instanceOf(got, DateTime, "Expecting DateTime instance");

  const gotTime = got.toTime();

  const expectedTime = new Date(expected).getTime();

  return testUtils.buildEqualsResult(
    gotTime === expectedTime,
    "Unexpected date",
    gotTime,
    expectedTime
  );
};

export const progressToBe: testUtils.ExpectFromMatcher<"progressToBe"> = (
  got: unknown,
  expected: number
): testUtils.ExpectResult => {
  assert.string(got, "Expecting string");

  const gotProgress = progressReporter.getProgress();

  const classAttrs =
    gotProgress === 0
      ? new ReadonlySet([undefined, ""])
      : new ReadonlySet(["progress-bar-active"]);

  const styleAttrs =
    gotProgress === 0
      ? new ReadonlySet([undefined, ""])
      : new ReadonlySet([`width: ${100 * gotProgress}%;`]);

  assert.toBeTrue(classAttrs.has($(got).attr("class")), "Unexpected class");
  assert.toBeTrue(styleAttrs.has($(got).attr("style")), "Unexpected style");

  return testUtils.buildEqualsResult(
    gotProgress === expected,
    "Unexpected progress",
    gotProgress,
    expected
  );
};

export const matchers = { datetimeToBe, progressToBe } as const;

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Checks that datetime equals expected value.
       *
       * @param expected - Expected value.
       * @returns Result object.
       */
      readonly datetimeToBe: (expected: string) => R;
      /**
       * Checks that progress equals expected value.
       *
       * @param expected - Expected value.
       * @returns Result object.
       */
      readonly progressToBe: (expected: number) => R;
    }
  }
}
