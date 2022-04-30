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
export declare const datetimeToBe: testUtils.ExpectFromMatcher<"datetimeToBe">;
export declare const progressToBe: testUtils.ExpectFromMatcher<"progressToBe">;
export declare const matchers: {
    readonly datetimeToBe: testUtils.ExpectFromMatcher<"datetimeToBe">;
    readonly progressToBe: testUtils.ExpectFromMatcher<"progressToBe">;
};
//# sourceMappingURL=expect.d.ts.map