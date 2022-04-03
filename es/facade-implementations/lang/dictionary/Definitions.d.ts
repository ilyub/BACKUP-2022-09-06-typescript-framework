import type { Context, Transforms, Word } from "@skylib/facades/es/lang";
import type { IndexedObject, strings } from "@skylib/functions/es/types/core";
import { Definition } from ".";
import type { PluralReduce, RawLanguage, WordInfo } from "./types";
export declare class Definitions {
    pluralReduce: PluralReduce;
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
    get(key: string, context: Context | undefined, forms: strings | string, count: number, replacements: ReadonlyMap<string, string>): WordInfo;
    /**
     * Checks that dictionary has word.
     *
     * @param key - Word ID.
     * @returns _True_ if dictionary has word, _false_ otherwise.
     */
    has(key: string): key is Transforms<Word>;
    protected wordForms: IndexedObject<strings>;
    protected words: IndexedObject<Definition>;
}
//# sourceMappingURL=Definitions.d.ts.map