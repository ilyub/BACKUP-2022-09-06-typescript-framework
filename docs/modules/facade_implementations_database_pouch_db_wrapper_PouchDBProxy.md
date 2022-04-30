[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/database/pouch-db-wrapper/PouchDBProxy

# Module: facade-implementations/database/pouch-db-wrapper/PouchDBProxy

## Table of contents

### Classes

- [PouchDBProxy](../classes/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md)

### Interfaces

- [Changes](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Changes.md)
- [Content](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Content.md)
- [PouchChangesHandler](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchChangesHandler.md)

### Type aliases

- [PouchChange](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchchange)
- [PouchChangesOptions](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchchangesoptions)
- [PouchDatabase](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchdatabase)
- [PouchDatabaseConfiguration](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchdatabaseconfiguration)
- [PouchError](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#poucherror)
- [PouchGetMeta](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchgetmeta)
- [PouchIdMeta](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchidmeta)
- [PouchPutDocument](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchputdocument)
- [PouchPutDocuments](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchputdocuments)
- [PouchQueryOptions](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchqueryoptions)
- [PouchQueryResponse](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchqueryresponse)
- [PouchResponse](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchresponse)

### Variables

- [handlers](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#handlers)

## Type aliases

### PouchChange

Ƭ **PouchChange**: `PouchDB.Core.ChangesResponseChange`<[`Content`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Content.md)\>

___

### PouchChangesOptions

Ƭ **PouchChangesOptions**: `PouchDB.Core.ChangesOptions`

___

### PouchDatabase

Ƭ **PouchDatabase**: `PouchDB.Database`<[`Content`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Content.md)\>

___

### PouchDatabaseConfiguration

Ƭ **PouchDatabaseConfiguration**: `PouchDB.Configuration.DatabaseConfiguration`

___

### PouchError

Ƭ **PouchError**: `PouchDB.Core.Error`

___

### PouchGetMeta

Ƭ **PouchGetMeta**: `PouchDB.Core.GetMeta`

___

### PouchIdMeta

Ƭ **PouchIdMeta**: `PouchDB.Core.IdMeta`

___

### PouchPutDocument

Ƭ **PouchPutDocument**: `PouchDB.Core.PutDocument`<[`Content`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Content.md)\>

___

### PouchPutDocuments

Ƭ **PouchPutDocuments**: readonly [`PouchPutDocument`](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchputdocument)[]

___

### PouchQueryOptions

Ƭ **PouchQueryOptions**: `PouchDB.Query.Options`<[`Content`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Content.md), [`Content`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Content.md)\>

___

### PouchQueryResponse

Ƭ **PouchQueryResponse**: `PouchDB.Query.Response`<[`Content`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Content.md)\>

___

### PouchResponse

Ƭ **PouchResponse**: `PouchDB.Core.Response`

## Variables

### handlers

• `Const` **handlers**: `Readonly`<{ `error`: (`error`: `unknown`) => `void`  }\>
