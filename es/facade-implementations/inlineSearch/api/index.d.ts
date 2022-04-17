import type { inlineSearch } from "@skylib/facades";
export { Engine } from "./Engine";
export declare type Constructor = new <T extends object>(idField: string & keyof T, fields: ReadonlyArray<string & keyof T>, items: readonly T[]) => inlineSearch.Engine<T>;
/**
 * Creates search engine.
 *
 * @param ctor - Search engine constructor.
 * @returns Search engine.
 */
export declare function createImplementation(ctor: Constructor): inlineSearch.Facade;
//# sourceMappingURL=index.d.ts.map