import type { Context, Word } from "@skylib/facades/dist/lang";
import type {
  NumStr,
  ReadonlyIndexedObject,
  ReadonlyPartialRecord,
  ReadonlyRecord
} from "@skylib/functions/dist/types/core";

export type PluralReduce = (count: number) => number;

export type RawDefinition =
  | string
  | RawDefinitions
  | readonly [NumStr, RawDefinitions]
  | readonly [NumStr, RawDefinitions, ReadonlyPartialRecord<Context, NumStr>];

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
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
