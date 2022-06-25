import { DateTime } from "../facade-implementations/datetime/date-fns-wrapper/DateTime";
import { progressReporter } from "@skylib/facades";
import { assert } from "@skylib/functions";
import $ from "jquery";
import type * as testUtils from "@skylib/functions/dist/test-utils";

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

export const datetimeToBe: testUtils.ExpectFromMatcher<"datetimeToBe"> = (
  got: unknown,
  expected: string
) => {
  assert.instanceOf(got, DateTime, "Expecting DateTime instance");

  return got.toTime() === new Date(expected).getTime()
    ? {
        message: (): string => `Expected date not to be "${expected}"`,
        pass: true
      }
    : {
        message: (): string =>
          `Expected date ("${got.toString()}") to be "${expected}"`,
        pass: false
      };
};

export const progressToBe: testUtils.ExpectFromMatcher<"progressToBe"> = (
  got: unknown,
  expected: number
) => {
  assert.string(got, "Expecting string");

  const gotProgress = progressReporter.getProgress();

  const classOptions =
    gotProgress === 0
      ? new Set([undefined, ""])
      : new Set(["progress-bar-active"]);

  const styleOptions =
    gotProgress === 0
      ? new Set([undefined, ""])
      : new Set([`width: ${100 * progressReporter.getProgress()}%;`]);

  return gotProgress === expected &&
    classOptions.has($(got).attr("class")) &&
    styleOptions.has($(got).attr("style"))
    ? {
        message: (): string => `Expected progress not to be ${expected}`,
        pass: true
      }
    : {
        message: (): string =>
          `Expected progress (${gotProgress}) to be ${expected}`,
        pass: false
      };
};

export const matchers = { datetimeToBe, progressToBe } as const;
