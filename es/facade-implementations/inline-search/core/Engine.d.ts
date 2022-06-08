import type { BuildIndex } from "./types";
import type { inlineSearch } from "@skylib/facades";
export declare abstract class Engine<T extends object, I> implements inlineSearch.Engine<T> {
    /**
     * Creates class instance.
     *
     * @param idField - ID field.
     * @param fields - Searchable fields.
     * @param items - Items.
     * @param buildIndex - Index builder.
     */
    constructor(idField: string & keyof T, fields: ReadonlyArray<string & keyof T>, items: readonly T[], buildIndex: BuildIndex<T, I>);
    abstract search(query: string): readonly T[];
    protected readonly idField: string & keyof T;
    protected readonly index: I;
    protected readonly items: readonly T[];
}
//# sourceMappingURL=Engine.d.ts.map