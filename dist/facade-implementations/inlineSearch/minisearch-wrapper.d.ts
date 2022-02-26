import MiniSearch from "minisearch";
import type { Facade } from "@skylib/facades/dist/inlineSearch";
import { Engine as BaseEngine } from "./api/template";
export declare class Engine<T extends object> extends BaseEngine<T, Readonly<MiniSearch>> {
    search(query: string): readonly T[];
    protected buildIndex(idField: string & keyof T, fields: ReadonlyArray<string & keyof T>, items: readonly T[]): Readonly<MiniSearch>;
}
export declare const implementation: Facade;
//# sourceMappingURL=minisearch-wrapper.d.ts.map