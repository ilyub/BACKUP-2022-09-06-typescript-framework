import MiniSearch from "minisearch";
import type { Engine as EngineInterface, Facade } from "@skylib/facades/es/inlineSearch";
export declare const implementation: Facade;
export declare class Engine<T extends object> implements EngineInterface<T> {
    /**
     * Creates class instance.
     *
     * @param idField - ID field.
     * @param fields - Searchable fields.
     * @param items - Items.
     */
    constructor(idField: keyof T & string, fields: ReadonlyArray<keyof T & string>, items: readonly T[]);
    search(query: string): readonly T[];
    protected idField: keyof T & string;
    protected index: Readonly<MiniSearch>;
    protected items: readonly T[];
}
//# sourceMappingURL=minisearch-wrapper.d.ts.map