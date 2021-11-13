import type { Context, Dictionary as DictionaryInterface, Transforms, Words } from "@skylib/facades/es/lang";
import type { NumStr, ReadonlyPartialRecord } from "@skylib/functions/es/types/core";
import type { LocaleName } from "@skylib/functions/es/types/locales";
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
    static create(definitions: ReadonlyPartialRecord<LocaleName, Definitions>, context?: Context, count?: number): Dictionary & Words;
    /**
     * Returns plugin configuration.
     *
     * @returns Plugin configuration.
     */
    static getConfiguration(): Dictionary.Configuration;
    context(context: Context): Dictionary & Words;
    get(key: string): string;
    has(key: string): key is Transforms;
    plural(count: number): Dictionary & Words;
    with(search: string, replace: NumStr): Dictionary & Words;
    protected _context: Context | undefined;
    protected count: number;
    protected definitions: ReadonlyPartialRecord<LocaleName, Definitions>;
    protected proxified: Dictionary & Words;
    protected subsPool: Map<NumStr, Dictionary & Readonly<Record<Transforms, string>>>;
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