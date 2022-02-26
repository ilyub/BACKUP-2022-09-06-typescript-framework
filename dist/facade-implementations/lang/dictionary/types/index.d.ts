import type { Context, Word } from "@skylib/facades/dist/lang";
import type { NumStr, ReadonlyIndexedObject, ReadonlyPartialRecord, ReadonlyRecord } from "@skylib/functions/dist/types/core";
export interface PluralReduce {
    /**
     * Reduces count for plural form.
     *
     * @param count - Count.
     * @returns Reduced count.
     */
    (count: number): number;
}
export declare type RawDefinition = RawDefinitions | string | readonly [NumStr, RawDefinitions, ReadonlyPartialRecord<Context, NumStr>] | readonly [NumStr, RawDefinitions];
export interface RawDefinitions {
    readonly [key: string]: RawDefinition;
}
export interface RawLanguage {
    readonly pluralReduce: PluralReduce;
    readonly wordForms: ReadonlyIndexedObject<readonly string[]>;
    readonly words: ReadonlyRecord<Word, RawDefinition>;
}
export interface WordInfo {
    readonly context: Context | undefined;
    readonly count: number;
    readonly forms: readonly string[];
    readonly replacements: ReadonlyMap<string, string>;
    readonly value: string;
}
//# sourceMappingURL=index.d.ts.map