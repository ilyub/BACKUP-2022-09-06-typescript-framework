import type { Definitions } from "./Definitions";
import type { lang } from "@skylib/facades";
import type { LocaleName, NumStr, Rec } from "@skylib/functions";
export declare class Dictionary implements lang.Dictionary<lang.Context> {
    /**
     * Creates dictionary.
     *
     * @param definitions - Language definitions.
     * @param context - Context.
     * @param count - Count for plural form.
     * @returns Dictionary.
     */
    static create(definitions: Rec<LocaleName, Definitions>, context?: lang.Context, count?: number): lang.Facade;
    context(context: lang.Context): lang.Facade;
    get(key: string): string;
    has(key: string): boolean;
    plural(count: number): lang.Facade;
    with(search: string, replace: NumStr): lang.Facade;
    protected readonly _context: lang.Context | undefined;
    protected readonly count: number;
    protected readonly definitions: Rec<LocaleName, Definitions>;
    protected readonly facade: lang.Facade;
    protected readonly subs: Map<NumStr, lang.Facade>;
    /**
     * Creates class instance.
     *
     * @param definitions - Language definitions.
     * @param context - Context.
     * @param count - Count for plural form.
     */
    protected constructor(definitions: Rec<LocaleName, Definitions>, context?: lang.Context, count?: number);
    /**
     * Reduces count for plural form.
     *
     * @param count - Count.
     * @returns Reduced count.
     */
    protected pluralReduce(count: number): number;
}
//# sourceMappingURL=Dictionary.d.ts.map