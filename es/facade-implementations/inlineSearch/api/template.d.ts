import type { Engine as EngineInterface, Facade } from "@skylib/facades/es/inlineSearch";
export declare type Constructor = new <T extends object>(idField: string & keyof T, fields: ReadonlyArray<string & keyof T>, items: readonly T[]) => EngineInterface<T>;
/**
 * Creates search engine.
 *
 * @param ctor - Search engine constructor.
 * @returns Search engine.
 */
export declare function createImplementation(ctor: Constructor): Facade;
export declare abstract class Engine<T extends object, I> implements EngineInterface<T> {
    /**
     * Creates class instance.
     *
     * @param idField - ID field.
     * @param fields - Searchable fields.
     * @param items - Items.
     */
    constructor(idField: string & keyof T, fields: ReadonlyArray<string & keyof T>, items: readonly T[]);
    abstract search(query: string): readonly T[];
    protected idField: string & keyof T;
    protected index: I;
    protected items: readonly T[];
    /**
     * Builds index.
     *
     * @param idField - ID field.
     * @param fields - Searchable fields.
     * @param items - Items.
     * @returns Index.
     */
    protected abstract buildIndex(idField: string & keyof T, fields: ReadonlyArray<string & keyof T>, items: readonly T[]): I;
}
//# sourceMappingURL=template.d.ts.map