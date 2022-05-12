import { implementations } from "..";
import { lang } from "@skylib/facades";
import type { LocaleName } from "@skylib/functions";
export declare const jestReset: (() => void) & {
    /**
     * Jest reset.
     *
     * @param this - No this.
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary(this: void, localeName: LocaleName, definitions: implementations.lang.dictionary.DefinitionsByLocale): void;
};
export declare const jestSetup: (() => void) & {
    /**
     * Jest setup.
     *
     * @param this - No this.
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary(this: void, localeName: LocaleName, definitions: implementations.lang.dictionary.DefinitionsByLocale): void;
};
//# sourceMappingURL=index.d.ts.map