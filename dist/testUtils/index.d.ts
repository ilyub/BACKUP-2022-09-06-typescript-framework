import { lang } from "@skylib/facades";
import type { LocaleName, Rec } from "@skylib/functions";
import type * as testUtils from "@skylib/functions/dist/testUtils";
import { implementations } from "..";
declare global {
    namespace jest {
        interface Matchers<R> {
            /**
             * Checks that datetime equals expected value.
             *
             * @param expected - Expected value.
             * @returns Result object.
             */
            readonly datetimeToEqual: (expected: string) => R;
        }
    }
}
/**
 * Jest reset.
 */
export declare const jestReset: {
    /**
     * Jest reset.
     *
     * @param this - No this.
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary(this: void, localeName: LocaleName, definitions: Rec<LocaleName, implementations.lang.dictionary.Definitions>): void;
    /**
     * Jest reset.
     *
     * @param this - No this.
     */
    dom(this: void): void;
} & (() => void);
/**
 * Jest setup.
 */
export declare const jestSetup: {
    /**
     * Jest setup.
     *
     * @param this - No this.
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary(this: void, localeName: LocaleName, definitions: Rec<LocaleName, implementations.lang.dictionary.Definitions>): void;
    /**
     * Jest setup.
     *
     * @param this - No this.
     */
    dom(this: void): void;
} & (() => void);
/**
 * Checks that datetime equals expected value.
 *
 * @param got - Got value.
 * @param expected - Expected value.
 * @returns Result object.
 */
export declare const datetimeToEqual: testUtils.ExpectFromMatcher<"datetimeToEqual">;
//# sourceMappingURL=index.d.ts.map