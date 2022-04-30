[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/database/pouch-db-wrapper/Database

# Module: facade-implementations/database/pouch-db-wrapper/Database

## Table of contents

### Classes

- [Database](../classes/facade_implementations_database_pouch_db_wrapper_Database.Database.md)

### Interfaces

- [Configuration](../interfaces/facade_implementations_database_pouch_db_wrapper_Database.Configuration.md)
- [Filter](../interfaces/facade_implementations_database_pouch_db_wrapper_Database.Filter.md)
- [MapReduce](../interfaces/facade_implementations_database_pouch_db_wrapper_Database.MapReduce.md)
- [RawQueryOptions](../interfaces/facade_implementations_database_pouch_db_wrapper_Database.RawQueryOptions.md)
- [RawQueryOptionsAttached](../interfaces/facade_implementations_database_pouch_db_wrapper_Database.RawQueryOptionsAttached.md)
- [RawQueryResponse](../interfaces/facade_implementations_database_pouch_db_wrapper_Database.RawQueryResponse.md)
- [ReactiveHandler](../interfaces/facade_implementations_database_pouch_db_wrapper_Database.ReactiveHandler.md)
- [ReactiveHandlerAttached](../interfaces/facade_implementations_database_pouch_db_wrapper_Database.ReactiveHandlerAttached.md)
- [ReactiveRequest](../interfaces/facade_implementations_database_pouch_db_wrapper_Database.ReactiveRequest.md)
- [ReactiveRequestAttached](../interfaces/facade_implementations_database_pouch_db_wrapper_Database.ReactiveRequestAttached.md)

### Variables

- [handlers](facade_implementations_database_pouch_db_wrapper_Database.md#handlers)

### Functions

- [wrapError](facade_implementations_database_pouch_db_wrapper_Database.md#wraperror)

## Variables

### handlers

• `Const` **handlers**: `Readonly`<{ `error`: (`error`: `unknown`) => `void`  }\>

## Functions

### wrapError

▸ **wrapError**<`T`\>(`e`): () => `T`

Wraps error.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `T` | Error. |

#### Returns

`fn`

Wrapped error.

▸ (): `T`

Wraps error.

##### Returns

`T`

Wrapped error.
