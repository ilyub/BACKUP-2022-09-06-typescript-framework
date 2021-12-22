import lunr from "lunr";
import type { Facade } from "@skylib/facades/es/inlineSearch";
import { Engine as BaseEngine } from "./api/template";
export declare class Engine<T extends object> extends BaseEngine<T, lunr.Index> {
    search(query: string): readonly T[];
    protected buildIndex(idField: keyof T & string, fields: ReadonlyArray<keyof T & string>, items: readonly T[]): lunr.Index;
}
export declare const implementation: Facade;
//# sourceMappingURL=lunr-wrapper.d.ts.map