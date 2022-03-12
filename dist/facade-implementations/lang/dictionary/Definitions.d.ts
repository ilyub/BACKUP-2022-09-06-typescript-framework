import type { Context, Transforms, Word } from "@skylib/facades/dist/lang";
import type { ReadonlyIndexedObject, strings } from "@skylib/functions/dist/types/core";
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
     * Checks if dictionary has word.
     *
     * @param key - Word ID.
     * @returns _True_ if dictionary has word, _false_ otherwise.
     */
    has(key: string): key is Transforms<Word>;
    protected wordForms: ReadonlyIndexedObject<strings>;
    protected words: ReadonlyIndexedObject<Definition>;
}
//# sourceMappingURL=Definitions.d.ts.map