import MiniSearch from "minisearch";
import type { Engine as EngineInterface, Facade } from "@skylib/facades/es/inlineSearch";
export declare const implementation: Facade;
export declare class Engine<T extends object> implements EngineInterface {
    /**
     * Creates class instance.
     *
     * @param idField - ID field.
     * @param fields - Searchable fields.
     * @param items - Items.
     */
    constructor(idField: string, fields: readonly string[], items: readonly T[]);
    search(query: string): readonly unknown[];
    protected minisearch: Readonly<MiniSearch>;
}
//# sourceMappingURL=minisearch-wrapper.d.ts.map