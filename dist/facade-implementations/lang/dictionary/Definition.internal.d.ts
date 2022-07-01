import type { WordInfo } from "./core";
import type { lang } from "@skylib/facades";
import type { strings } from "@skylib/functions";
export interface Definitions {
    /**
     * Returns word based on context, count, and replacements.
     *
     * @param key - Key.
     * @param context - Context.
     * @param count - Count for plural form.
     * @param replacements - Replacements.
     * @param forms - Candidate word forms.
     * @returns Word.
     */
    readonly get: (key: string, context: lang.Context | undefined, count: number, replacements: ReadonlyMap<string, string>, forms?: strings | string) => WordInfo;
}
//# sourceMappingURL=Definition.internal.d.ts.map