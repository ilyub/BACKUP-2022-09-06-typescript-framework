[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/database/PouchDBWrapper/Database

# Module: facade-implementations/database/PouchDBWrapper/Database

## Table of contents

### Classes

- [Database](../classes/facade_implementations_database_PouchDBWrapper_Database.Database.md)

### Interfaces

- [Configuration](../interfaces/facade_implementations_database_PouchDBWrapper_Database.Configuration.md)
- [MapReduce](../interfaces/facade_implementations_database_PouchDBWrapper_Database.MapReduce.md)
- [RawQueryOptions](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryOptions.md)
- [RawQueryOptionsAttached](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryOptionsAttached.md)
- [RawQueryResponse](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryResponse.md)

### Type aliases

- [Filter](facade_implementations_database_PouchDBWrapper_Database.md#filter)
- [ReactiveHandler](facade_implementations_database_PouchDBWrapper_Database.md#reactivehandler)
- [ReactiveHandlerAttached](facade_implementations_database_PouchDBWrapper_Database.md#reactivehandlerattached)
- [ReactiveRequest](facade_implementations_database_PouchDBWrapper_Database.md#reactiverequest)
- [ReactiveRequestAttached](facade_implementations_database_PouchDBWrapper_Database.md#reactiverequestattached)

### Variables

- [handlers](facade_implementations_database_PouchDBWrapper_Database.md#handlers)

## Type aliases

### Filter

Ƭ **Filter**: (`doc`: `unknown`) => `boolean`

#### Type declaration

▸ (`doc`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `unknown` |

##### Returns

`boolean`

___

### ReactiveHandler

Ƭ **ReactiveHandler**<`T`\>: (`doc`: `ExistingDocument`, `mutableResult`: `Writable`<`ReactiveResponseAsync`<`T`\>\>) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`doc`, `mutableResult`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `ExistingDocument` |
| `mutableResult` | `Writable`<`ReactiveResponseAsync`<`T`\>\> |

##### Returns

`void`

___

### ReactiveHandlerAttached

Ƭ **ReactiveHandlerAttached**<`T`\>: (`doc`: `ExistingAttachedDocument`, `mutableResult`: `Writable`<`ReactiveResponseAsync`<`T`\>\>) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`doc`, `mutableResult`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `ExistingAttachedDocument` |
| `mutableResult` | `Writable`<`ReactiveResponseAsync`<`T`\>\> |

##### Returns

`void`

___

### ReactiveRequest

Ƭ **ReactiveRequest**<`T`\>: (`conditions?`: `Conditions`, `options?`: `QueryOptions`) => `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`conditions?`, `options?`): `Promise`<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `conditions?` | `Conditions` |
| `options?` | `QueryOptions` |

##### Returns

`Promise`<`T`\>

___

### ReactiveRequestAttached

Ƭ **ReactiveRequestAttached**<`T`\>: (`conditions?`: `Conditions`, `parentConditions?`: `Conditions`, `options?`: `QueryOptions`) => `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`conditions?`, `parentConditions?`, `options?`): `Promise`<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `conditions?` | `Conditions` |
| `parentConditions?` | `Conditions` |
| `options?` | `QueryOptions` |

##### Returns

`Promise`<`T`\>

## Variables

### handlers

• **handlers**: `Readonly`<{ `error`: (`error`: `unknown`) => `void`  }\>
