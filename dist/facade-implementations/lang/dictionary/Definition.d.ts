import type { Context } from "@skylib/facades/dist/lang";
import type { NumStr, ReadonlyIndexedObject } from "@skylib/functions/dist/types/core";
import type { Definitions } from ".";
import type { RawDefinition, WordInfo } from "./types";
export declare class Definition {
    /**
     * Creates class instance.
     *
     * @param raw - Raw definition.
     * @param id - ID.
     */
    constructor(raw: RawDefinition, id: string);
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
    get(owner: Definitions, context: Context | undefined, forms: readonly string[], count: number, replacements: ReadonlyMap<string, string>): WordInfo;
    protected contexts: ReadonlyIndexedObject<NumStr>;
    protected id: string;
    protected rulesRef: ReadonlyArray<readonly string[]>;
    protected rulesRefDependent: ReadonlyArray<readonly string[]>;
    protected rulesRefSecondary: ReadonlyArray<readonly string[]>;
    protected rulesVal: ReadonlyArray<readonly string[]>;
    protected rulesWord: ReadonlyArray<readonly string[]>;
    protected rulesWordSecondary: ReadonlyArray<readonly string[]>;
    protected sub: Definition | undefined;
    protected subs: ReadonlyIndexedObject<Definition>;
    protected value: string;
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