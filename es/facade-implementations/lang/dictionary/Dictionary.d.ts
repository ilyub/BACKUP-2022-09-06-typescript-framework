import type { LocaleName, NumStr, Rec } from "@skylib/functions";
import type { Definitions } from "./Definitions";
import type { lang } from "@skylib/facades";
export declare class Dictionary implements lang.Dictionary<lang.Word, lang.Context> {
    /**
     * Creates dictionary.
     *
     * @param definitions - Language definitions.
     * @param context - Context.
     * @param count - Count for plural form.
     * @returns Dictionary.
     */
    static readonly create: (definitions: Rec<LocaleName, Definitions>, context?: lang.Context, count?: number) => lang.Facade;
    readonly keys: Rec<lang.Transforms, lang.Transforms>;
    readonly plain: (str: string) => lang.Plain;
    context(context: lang.Context): lang.Facade;
    get(key: lang.Key): string;
    getIfExists(key: string): string;
    has(key: string): key is lang.Key;
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