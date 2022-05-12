[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/PouchProxy](../modules/facade_implementations_database_pouchdb_wrapper_PouchProxy.md) / PouchProxy

# Class: PouchProxy

[facade-implementations/database/pouchdb-wrapper/PouchProxy](../modules/facade_implementations_database_pouchdb_wrapper_PouchProxy.md).PouchProxy

## Hierarchy

- **`PouchProxy`**

  ↳ [`PouchProxy`](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md)

## Table of contents

### Constructors

- [constructor](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#constructor)

### Properties

- [db](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#db)

### Methods

- [bulkDocs](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#bulkdocs)
- [changes](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#changes)
- [destroy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#destroy)
- [get](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#get)
- [getRawDb](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#getrawdb)
- [post](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#post)
- [put](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#put)
- [query](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#query)

## Constructors

### constructor

• **new PouchProxy**(`name`, `config`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Database name. |
| `config` | `DatabaseConfiguration` | Database configuration. |

## Properties

### db

• `Protected` `Readonly` **db**: [`PouchDatabase`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

## Methods

### bulkDocs

▸ **bulkDocs**(`docs`): `Promise`<([`PouchError`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchError.md) \| [`PouchResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchResponse.md))[]\>

Creates, updates or deletes multiple documents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `docs` | [`PouchPutDocuments`](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md#pouchputdocuments) | Documents. |

#### Returns

`Promise`<([`PouchError`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchError.md) \| [`PouchResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchResponse.md))[]\>

Responses.

___

### changes

▸ **changes**(`changesHandler`, `options`): [`PouchChanges`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

Subscribes to changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `changesHandler` | [`PouchChangesHandler`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesHandler.md) | Changes handler. |
| `options` | [`PouchChangesOptions`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md) | Options. |

#### Returns

[`PouchChanges`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

Subscription ID.

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

Destroys database.

#### Returns

`Promise`<`void`\>

___

### get

▸ **get**(`id`): `Promise`<[`Content`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & [`PouchGetMeta`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchGetMeta.md) & [`PouchIdMeta`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchIdMeta.md)\>

Fetches document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID. |

#### Returns

`Promise`<[`Content`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & [`PouchGetMeta`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchGetMeta.md) & [`PouchIdMeta`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchIdMeta.md)\>

Document.

___

### getRawDb

▸ **getRawDb**(): [`PouchDatabase`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

Returns original PouchDB database.

#### Returns

[`PouchDatabase`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

Original PouchDB database.

___

### post

▸ **post**(`doc`): `Promise`<[`PouchResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchResponse.md)\>

Posts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | [`PouchPutDocument`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md) | Document. |

#### Returns

`Promise`<[`PouchResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchResponse.md)\>

Response.

___

### put

▸ **put**(`doc`): `Promise`<[`PouchResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchResponse.md)\>

Puts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | [`PouchPutDocument`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md) | Document. |

#### Returns

`Promise`<[`PouchResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchResponse.md)\>

Response.

___

### query

▸ **query**(`mapReduce`, `options`): `Promise`<[`PouchQueryResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryResponse.md)\>

Queries database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapReduce` | `string` | The name of a view in an existing design document. |
| `options` | [`PouchQueryOptions`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md) | Options. |

#### Returns

`Promise`<[`PouchQueryResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryResponse.md)\>

Response.
