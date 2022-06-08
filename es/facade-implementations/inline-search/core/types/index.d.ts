import type { inlineSearch } from "@skylib/facades";
export interface BuildIndex<T extends object, I> {
    /**
     *Builds index.
     *
     * @param idField - ID field.
     * @param fields - Searchable fields.
     * @param items - Items.
     */
    (idField: string & keyof T, fields: ReadonlyArray<string & keyof T>, items: readonly T[]): I;
}
export interface Constructor {
    /**
     * Creates class instance.
     *
     * @param idField - ID field.
     * @param fields - Searchable fields.
     * @param items - Items.
     */
    new <T extends object>(idField: string & keyof T, fields: ReadonlyArray<string & keyof T>, items: readonly T[]): inlineSearch.Engine<T>;
}
//# sourceMappingURL=index.d.ts.map