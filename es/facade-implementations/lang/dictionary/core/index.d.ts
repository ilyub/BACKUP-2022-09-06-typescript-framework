import type { lang } from "@skylib/facades";
import type { LocaleName, NumStr, PartialRecord, Rec, strings } from "@skylib/functions";
export declare const moduleConfig: Configuration;
export declare const pluralReduce: PluralReduce & PluralReduceInternational;
export interface Configuration {
    readonly localeName: LocaleName;
}
export interface PartialConfiguration extends Partial<Configuration> {
}
export interface PluralReduce {
    /**
     * Reduces count for plural form.
     *
     * @param count - Count.
     * @returns Reduced count.
     */
    (count: number): number;
}
export interface PluralReduceInternational {
    readonly ru: PluralReduce;
}
export declare type RawDefinition = RawDefinitions | string | readonly [NumStr, RawDefinitions, PartialRecord<lang.Context, NumStr>] | readonly [NumStr, RawDefinitions];
export interface RawDefinitions {
    readonly [key: string]: RawDefinition;
}
export interface RawLanguage {
    readonly pluralReduce: PluralReduce;
    readonly wordForms: Rec<string, strings>;
    readonly words: Rec<lang.Word, RawDefinition>;
}
export declare type Rules = readonly strings[];
export interface WordInfo {
    readonly context?: lang.Context;
    readonly count: number;
    readonly forms: strings;
    readonly replacements: ReadonlyMap<string, string>;
    readonly value: string;
}
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export declare function configure(config: PartialConfiguration): void;
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export declare function getConfiguration(): Configuration;
//# sourceMappingURL=index.d.ts.map