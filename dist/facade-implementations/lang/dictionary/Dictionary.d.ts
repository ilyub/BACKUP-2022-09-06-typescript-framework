import type { Context, Dictionary as DictionaryInterface, Facade, Transforms, Word } from "@skylib/facades/dist/lang";
import type { NumStr, ReadonlyPartialRecord } from "@skylib/functions/dist/types/core";
import type { LocaleName } from "@skylib/functions/dist/types/locales";
import type { Definitions } from ".";
export declare namespace Dictionary {
    interface Configuration {
        readonly localeName: LocaleName;
    }
    type PartialConfiguration<K extends keyof Configuration> = {
        readonly [L in K]: Configuration[L];
    };
}
export declare class Dictionary implements DictionaryInterface {
    /**
     * Configures plugin.
     *
     * @param config - Plugin configuration.
     */
    static configure<K extends keyof Dictionary.Configuration>(config: Dictionary.PartialConfiguration<K>): void;
    /**
     * Creates class instance.
     *
     * @param definitions - Language definitions.
     * @param context - Context.
     * @param count - Count for plural form.
     * @returns Dictionary.
     */
    static create(definitions: ReadonlyPartialRecord<LocaleName, Definitions>, context?: Context, count?: number): Facade;
    /**
     * Returns plugin configuration.
     *
     * @returns Plugin configuration.
     */
    static getConfiguration(): Dictionary.Configuration;
    context(context: Context): Facade;
    get(key: string): string;
    has(key: string): key is Transforms<Word>;
    plural(count: number): Facade;
    with(search: string, replace: NumStr): Facade;
    protected _context: Context | undefined;
    protected count: number;
    protected definitions: ReadonlyPartialRecord<LocaleName, Definitions>;
    protected proxified: Facade;
    protected subsPool: Map<NumStr, Facade>;
    /**
     * Creates class instance.
     *
     * @param definitions - Language definitions.
     * @param context - Context.
     * @param count - Count for plural form.
     */
    protected constructor(definitions: ReadonlyPartialRecord<LocaleName, Definitions>, context?: Context, count?: number);
    /**
     * Reduces count for plural word form.
     *
     * @param count - Count.
     * @returns Reduced count.
     */
    protected pluralReduce(count: number): number;
}
//# sourceMappingURL=Dictionary.d.ts.map