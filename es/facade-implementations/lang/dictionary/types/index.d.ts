import type { Context, Word } from "@skylib/facades/es/lang";
import type { IndexedObject, NumStr, PartialRecord, Rec, strings } from "@skylib/functions/es/types/core";
export interface PluralReduce {
    /**
     * Reduces count for plural form.
     *
     * @param count - Count.
     * @returns Reduced count.
     */
    (count: number): number;
}
export declare type RawDefinition = RawDefinitions | string | readonly [NumStr, RawDefinitions, PartialRecord<Context, NumStr>] | readonly [NumStr, RawDefinitions];
export interface RawDefinitions {
    readonly [key: string]: RawDefinition;
}
export interface RawLanguage {
    readonly pluralReduce: PluralReduce;
    readonly wordForms: IndexedObject<strings>;
    readonly words: Rec<Word, RawDefinition>;
}
export interface WordInfo {
    readonly context: Context | undefined;
    readonly count: number;
    readonly forms: strings;
    readonly replacements: ReadonlyMap<string, string>;
    readonly value: string;
}
//# sourceMappingURL=index.d.ts.map