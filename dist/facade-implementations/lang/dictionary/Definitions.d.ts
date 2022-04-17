import type { lang } from "@skylib/facades";
import type { IndexedObject, strings } from "@skylib/functions";
import { Definition } from "./Definition";
import type { PluralReduce, RawLanguage, WordInfo } from "./types";
export declare class Definitions {
    readonly pluralReduce: PluralReduce;
    /**
     * Creates class instance.
     *
     * @param raw - Language definition.
     */
    constructor(raw: RawLanguage);
    /**
     * Gets word based on context, count, and replacements.
     *
     * @param key - Word ID.
     * @param context - Context.
     * @param forms - Word forms or reference to wordForms.
     * @param count - Count for plural form.
     * @param replacements - Replacements.
     * @returns Word.
     */
    get(key: string, context: lang.Context | undefined, forms: strings | string, count: number, replacements: ReadonlyMap<string, string>): WordInfo;
    /**
     * Checks that dictionary has word.
     *
     * @param key - Word ID.
     * @returns _True_ if dictionary has word, _false_ otherwise.
     */
    has(key: string): key is lang.Transforms<lang.Word>;
    protected readonly wordForms: IndexedObject<strings>;
    protected readonly words: IndexedObject<Definition>;
}
//# sourceMappingURL=Definitions.d.ts.map