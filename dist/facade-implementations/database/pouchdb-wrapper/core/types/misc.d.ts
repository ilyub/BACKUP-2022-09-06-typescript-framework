import type { database } from "@skylib/facades";
import type { Writable, unknowns } from "@skylib/functions";
export interface Configuration {
    readonly reindexThreshold?: number;
}
export interface Filter {
    /**
     * Filter function.
     *
     * @param doc - Document.
     * @returns Result.
     */
    (doc: unknown): boolean;
}
export interface MapReduce {
    readonly groupLevel: number;
    readonly id: string;
    readonly mapReduce: {
        readonly map: string;
        readonly reduce: string;
    };
    readonly output: Filter;
    readonly settle: Filter;
}
export interface RawQueryOptions {
    readonly conditions: database.Conditions;
    readonly count?: true;
    readonly docs?: true;
    readonly unsettledCount?: true;
}
export interface RawQueryOptionsAttached extends RawQueryOptions {
    readonly parentConditions: database.Conditions;
}
export interface RawQueryResponse {
    readonly count: number;
    readonly docs: unknowns;
    readonly mapReduce: MapReduce;
    readonly unsettledCount: number;
}
export interface ReactiveHandler<T> {
    /**
     * Reactive handler.
     *
     * @param doc - Document.
     * @param mutableResult - Result.
     */
    (doc: database.ExistingDocument, mutableResult: Writable<database.ReactiveResponseLoaded<T>>): void;
}
export interface ReactiveHandlerAttached<T> {
    /**
     * Reactive handler.
     *
     * @param doc - Document.
     * @param mutableResult - Result.
     */
    (doc: database.ExistingAttachedDocument, mutableResult: Writable<database.ReactiveResponseLoaded<T>>): void;
}
export interface ReactiveRequest<T> {
    /**
     * Reactive request.
     *
     * @param conditions - Conditions.
     * @param options - Options.
     * @returns Promise.
     */
    (conditions?: database.Conditions, options?: database.QueryOptions): Promise<T>;
}
export interface ReactiveRequestAttached<T> {
    /**
     * Reactive request.
     *
     * @param conditions - Conditions.
     * @param parentConditions - Parent conditions.
     * @param options - Options.
     * @returns Promise.
     */
    (conditions?: database.Conditions, parentConditions?: database.Conditions, options?: database.QueryOptions): Promise<T>;
}
//# sourceMappingURL=misc.d.ts.map