import type { Definitions } from "./Definitions";
import type { RawDefinition, Rules, WordInfo } from "./core";
import type { lang } from "@skylib/facades";
import type { IndexedObject, NumStr, strings } from "@skylib/functions";
export declare class Definition {
    /**
     * Creates class instance.
     *
     * @param raw - Raw definition.
     * @param id - ID.
     */
    constructor(raw: RawDefinition, id: NumStr);
    /**
     * Returns word based on context, count, and replacements.
     *
     * @param owner - Parent object.
     * @param context - Context.
     * @param count - Count for plural form.
     * @param replacements - Replacements.
     * @param forms - Candidate word forms.
     * @returns Word.
     */
    get(owner: Definitions, context: lang.Context | undefined, count: number, replacements: ReadonlyMap<string, string>, forms: strings): WordInfo;
    protected readonly contexts: IndexedObject<NumStr>;
    protected readonly id: NumStr;
    protected readonly rulesRef: Rules;
    protected readonly rulesRefDependent: Rules;
    protected readonly rulesRefSecondary: Rules;
    protected readonly rulesVal: Rules;
    protected readonly rulesWordDependent: Rules;
    protected readonly rulesWordSecondary: Rules;
    protected readonly sub: Definition | undefined;
    protected readonly subs: IndexedObject<Definition>;
    protected readonly value: string;
}
//# sourceMappingURL=Definition.d.ts.map