[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/database/PouchDBWrapper/Database

# Module: facade-implementations/database/PouchDBWrapper/Database

## Table of contents

### Classes

- [Database](../classes/facade_implementations_database_PouchDBWrapper_Database.Database.md)

### Interfaces

- [Configuration](../interfaces/facade_implementations_database_PouchDBWrapper_Database.Configuration.md)
- [Filter](../interfaces/facade_implementations_database_PouchDBWrapper_Database.Filter.md)
- [MapReduce](../interfaces/facade_implementations_database_PouchDBWrapper_Database.MapReduce.md)
- [RawQueryOptions](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryOptions.md)
- [RawQueryOptionsAttached](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryOptionsAttached.md)
- [RawQueryResponse](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryResponse.md)
- [ReactiveHandler](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandler.md)
- [ReactiveHandlerAttached](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandlerAttached.md)
- [ReactiveRequest](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveRequest.md)
- [ReactiveRequestAttached](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveRequestAttached.md)

### Variables

- [handlers](facade_implementations_database_PouchDBWrapper_Database.md#handlers)

### Functions

- [wrapError](facade_implementations_database_PouchDBWrapper_Database.md#wraperror)

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
