import type { MapReduce, RawQueryOptions, RawQueryOptionsAttached } from "./types";
import type { database } from "@skylib/facades";
export declare enum DocType {
    attached = "attached",
    doc = "doc"
}
/**
 * Creates map/reduce function.
 *
 * @param options - Options.
 * @param queryOptions - Query options.
 * @param caseSensitiveSorting - Case sensitive sorting.
 * @returns Map/reduce function.
 */
export declare function getMapReduce(options: database.QueryOptions, queryOptions: RawQueryOptions, caseSensitiveSorting: boolean): MapReduce;
/**
 * Creates map/reduce function.
 *
 * @param options - Options.
 * @param queryOptions - Query options.
 * @param caseSensitiveSorting - Case sensitive sorting.
 * @returns Map/reduce function.
 */
export declare function getMapReduceAttached(options: database.QueryOptions, queryOptions: RawQueryOptionsAttached, caseSensitiveSorting: boolean): MapReduce;
//# sourceMappingURL=map-reduce.d.ts.map