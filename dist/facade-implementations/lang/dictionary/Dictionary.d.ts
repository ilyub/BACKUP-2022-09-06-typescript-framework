import type { lang } from "@skylib/facades";
import type { LocaleName, NumStr, Rec } from "@skylib/functions";
import type { Definitions } from "./Definitions";
export declare class Dictionary implements lang.Dictionary<lang.Context> {
    /**
     * Configures plugin.
     *
     * @param config - Plugin configuration.
     */
    static configure(config: Partial<Dictionary.Configuration>): void;
    /**
     * Creates class instance.
     *
     * @param definitions - Language definitions.
     * @param context - Context.
     * @param count - Count for plural form.
     * @returns Dictionary.
     */
    static create(definitions: Rec<LocaleName, Definitions>, context?: lang.Context, count?: number): lang.Facade;
    /**
     * Returns plugin configuration.
     *
     * @returns Plugin configuration.
     */
    static getConfiguration(): Dictionary.Configuration;
    context(context: lang.Context): lang.Facade;
    get(key: string): string;
    has(key: string): boolean;
    plural(count: number): lang.Facade;
    with(search: string, replace: NumStr): lang.Facade;
    protected readonly _context: lang.Context | undefined;
    protected readonly count: number;
    protected readonly definitions: Rec<LocaleName, Definitions>;
    protected readonly proxified: lang.Facade;
    protected readonly subsPool: Map<NumStr, lang.Facade>;
    /**
     * Creates class instance.
     *
     * @param definitions - Language definitions.
     * @param context - Context.
     * @param count - Count for plural form.
     */
    protected constructor(definitions: Rec<LocaleName, Definitions>, context?: lang.Context, count?: number);
    /**
     * Reduces count for plural word form.
     *
     * @param count - Count.
     * @returns Reduced count.
     */
    protected pluralReduce(count: number): number;
}
export declare namespace Dictionary {
    interface Configuration {
        readonly localeName: LocaleName;
    }
}
//# sourceMappingURL=Dictionary.d.ts.map