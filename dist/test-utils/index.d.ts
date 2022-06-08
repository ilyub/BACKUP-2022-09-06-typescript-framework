import { implementations } from "..";
import { lang } from "@skylib/facades";
import type { LocaleName } from "@skylib/functions";
export declare const jestReset: (() => void) & Readonly<{
    /**
     * Jest reset.
     *
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary: (localeName: LocaleName, definitions: implementations.lang.dictionary.DefinitionsByLocale) => void;
}>;
export declare const jestSetup: (() => void) & Readonly<{
    /**
     * Jest setup.
     *
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary: (localeName: LocaleName, definitions: implementations.lang.dictionary.DefinitionsByLocale) => void;
}>;
//# sourceMappingURL=index.d.ts.map