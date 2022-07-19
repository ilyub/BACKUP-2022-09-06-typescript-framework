[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/database/pouchdb-wrapper/core/map-reduce

# Module: facade-implementations/database/pouchdb-wrapper/core/map-reduce

## Table of contents

### Enumerations

- [DocType](../enums/facade_implementations_database_pouchdb_wrapper_core_map_reduce.DocType.md)

### Functions

- [getMapReduce](facade_implementations_database_pouchdb_wrapper_core_map_reduce.md#getmapreduce)
- [getMapReduceAttached](facade_implementations_database_pouchdb_wrapper_core_map_reduce.md#getmapreduceattached)

## Functions

### getMapReduce

▸ **getMapReduce**(`options`, `queryOptions`, `caseSensitiveSorting`): [`MapReduce`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.MapReduce.md)

Creates map/reduce function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `QueryOptions` | Options. |
| `queryOptions` | [`RawQueryOptions`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.RawQueryOptions.md) | Query options. |
| `caseSensitiveSorting` | `boolean` | Case sensitive sorting. |

#### Returns

[`MapReduce`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.MapReduce.md)

Map/reduce function.

___

### getMapReduceAttached

▸ **getMapReduceAttached**(`options`, `queryOptions`, `caseSensitiveSorting`): [`MapReduce`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.MapReduce.md)

Creates map/reduce function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `QueryOptions` | Options. |
| `queryOptions` | [`RawQueryOptionsAttached`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.RawQueryOptionsAttached.md) | Query options. |
| `caseSensitiveSorting` | `boolean` | Case sensitive sorting. |

#### Returns

[`MapReduce`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.MapReduce.md)

Map/reduce function.
