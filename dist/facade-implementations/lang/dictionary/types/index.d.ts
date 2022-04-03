import type { Context, Word } from "@skylib/facades/dist/lang";
import type { IndexedObject, NumStr, PartialTypedObject, strings, TypedObject } from "@skylib/functions/dist/types/core";
export interface PluralReduce {
    /**
     * Reduces count for plural form.
     *
     * @param count - Count.
     * @returns Reduced count.
     */
    (count: number): number;
}
export declare type RawDefinition = RawDefinitions | string | readonly [NumStr, RawDefinitions, PartialTypedObject<Context, NumStr>] | readonly [NumStr, RawDefinitions];
export interface RawDefinitions {
    readonly [key: string]: RawDefinition;
}
export interface RawLanguage {
    readonly pluralReduce: PluralReduce;
    readonly wordForms: IndexedObject<strings>;
    readonly words: TypedObject<Word, RawDefinition>;
}
export interface WordInfo {
    readonly context: Context | undefined;
    readonly count: number;
    readonly forms: strings;
    readonly replacements: ReadonlyMap<string, string>;
    readonly value: string;
}
//# sourceMappingURL=index.d.ts.map