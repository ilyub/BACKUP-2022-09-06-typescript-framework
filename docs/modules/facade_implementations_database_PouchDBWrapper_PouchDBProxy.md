[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/database/PouchDBWrapper/PouchDBProxy

# Module: facade-implementations/database/PouchDBWrapper/PouchDBProxy

## Table of contents

### Classes

- [PouchDBProxy](../classes/facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md)

### Interfaces

- [Changes](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Changes.md)
- [Content](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md)

### Type aliases

- [PouchChange](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchchange)
- [PouchChangesHandler](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchchangeshandler)
- [PouchChangesOptions](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchchangesoptions)
- [PouchDatabase](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabase)
- [PouchDatabaseConfiguration](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabaseconfiguration)
- [PouchError](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#poucherror)
- [PouchGetMeta](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchgetmeta)
- [PouchIdMeta](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchidmeta)
- [PouchPutDocument](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchputdocument)
- [PouchQueryOptions](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchqueryoptions)
- [PouchQueryResponse](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchqueryresponse)
- [PouchResponse](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchresponse)

### Variables

- [handlers](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#handlers)

## Type aliases

### PouchChange

Ƭ **PouchChange**: `DeepReadonly`<`PouchDB.Core.ChangesResponseChange`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md)\>\>

___

### PouchChangesHandler

Ƭ **PouchChangesHandler**: (`change`: [`PouchChange`](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchchange)) => `void`

#### Type declaration

▸ (`change`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `change` | [`PouchChange`](facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchchange) |

##### Returns

`void`

___

### PouchChangesOptions

Ƭ **PouchChangesOptions**: `DeepReadonly`<`PouchDB.Core.ChangesOptions`\>

___

### PouchDatabase

Ƭ **PouchDatabase**: `DeepReadonly`<`PouchDB.Database`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md)\>\>

___

### PouchDatabaseConfiguration

Ƭ **PouchDatabaseConfiguration**: `DeepReadonly`<`PouchDB.Configuration.DatabaseConfiguration`\>

___

### PouchError

Ƭ **PouchError**: `Readonly`<`PouchDB.Core.Error`\>

___

### PouchGetMeta

Ƭ **PouchGetMeta**: `DeepReadonly`<`PouchDB.Core.GetMeta`\>

___

### PouchIdMeta

Ƭ **PouchIdMeta**: `Readonly`<`PouchDB.Core.IdMeta`\>

___

### PouchPutDocument

Ƭ **PouchPutDocument**: `DeepReadonly`<`PouchDB.Core.PutDocument`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md)\>\>

___

### PouchQueryOptions

Ƭ **PouchQueryOptions**: `DeepReadonly`<`PouchDB.Query.Options`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md), [`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md)\>\>

___

### PouchQueryResponse

Ƭ **PouchQueryResponse**: `DeepReadonly`<`PouchDB.Query.Response`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md)\>\>

___

### PouchResponse

Ƭ **PouchResponse**: `Readonly`<`PouchDB.Core.Response`\>

## Variables

### handlers

• **handlers**: `Readonly`<{ `error`: (`error`: `unknown`) => `void`  }\>
