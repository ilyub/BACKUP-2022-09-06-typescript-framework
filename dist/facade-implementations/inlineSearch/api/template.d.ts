import type { Engine as EngineInterface, Facade } from "@skylib/facades/dist/inlineSearch";
export declare type Constructor = new <T extends object>(idField: keyof T & string, fields: ReadonlyArray<keyof T & string>, items: readonly T[]) => EngineInterface<T>;
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
    constructor(idField: keyof T & string, fields: ReadonlyArray<keyof T & string>, items: readonly T[]);
    abstract search(query: string): readonly T[];
    protected idField: keyof T & string;
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
    protected abstract buildIndex(idField: keyof T & string, fields: ReadonlyArray<keyof T & string>, items: readonly T[]): I;
}
//# sourceMappingURL=template.d.ts.map