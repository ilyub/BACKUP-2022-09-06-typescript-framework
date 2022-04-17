import type { lang } from "@skylib/facades";
import type { IndexedObject, NumStr, strings } from "@skylib/functions";
import type { Definitions } from "./Definitions";
import type { RawDefinition, WordInfo } from "./types";
export declare class Definition {
    /**
     * Creates class instance.
     *
     * @param raw - Raw definition.
     * @param id - ID.
     */
    constructor(raw: RawDefinition, id: NumStr);
    /**
     * Returns word based on context, word forms, and count.
     * Applies replacements.
     *
     * @param owner - Parent object.
     * @param context - Context.
     * @param forms - Word form.
     * @param count - Count for plural form.
     * @param replacements - Replacements.
     * @returns Word.
     */
    get(owner: Definitions, context: lang.Context | undefined, forms: strings, count: number, replacements: ReadonlyMap<string, string>): WordInfo;
    protected readonly contexts: IndexedObject<NumStr>;
    protected readonly id: NumStr;
    protected readonly rulesRef: readonly strings[];
    protected readonly rulesRefDependent: readonly strings[];
    protected readonly rulesRefSecondary: readonly strings[];
    protected readonly rulesVal: readonly strings[];
    protected readonly rulesWord: readonly strings[];
    protected readonly rulesWordSecondary: readonly strings[];
    protected readonly sub: Definition | undefined;
    protected readonly subs: IndexedObject<Definition>;
    protected readonly value: string;
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @param owner - Parent object.
     * @returns Modified word.
     */
    protected applyRulesRef(word: WordInfo, owner: Definitions): WordInfo;
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @param owner - Parent object.
     * @returns Modified word.
     */
    protected applyRulesRefDependent(word: WordInfo, owner: Definitions): WordInfo;
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @param owner - Parent object.
     * @returns Modified word.
     */
    protected applyRulesRefSecondary(word: WordInfo, owner: Definitions): WordInfo;
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @returns Modified word.
     */
    protected applyRulesVal(word: WordInfo): WordInfo;
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @param owner - Parent object.
     * @returns Modified word.
     */
    protected applyRulesWord(word: WordInfo, owner: Definitions): WordInfo;
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @param owner - Parent object.
     * @returns Modified word.
     */
    protected applyRulesWordSecondary(word: WordInfo, owner: Definitions): WordInfo;
}
//# sourceMappingURL=Definition.d.ts.map