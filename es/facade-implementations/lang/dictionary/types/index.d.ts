import type { Context, Word } from "@skylib/facades/es/lang";
import type { NumStr, ReadonlyIndexedObject, ReadonlyRecord } from "@skylib/functions/es/types/core";
export declare type PluralReduce = (count: number) => number;
export declare type RawDefinition = string | RawDefinitions | readonly [NumStr, RawDefinitions] | readonly [NumStr, RawDefinitions, ReadonlyIndexedObject<NumStr>];
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