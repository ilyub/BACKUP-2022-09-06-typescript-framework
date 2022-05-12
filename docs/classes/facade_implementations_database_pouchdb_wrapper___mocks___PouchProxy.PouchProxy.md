[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/\_\_mocks\_\_/PouchProxy](../modules/facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.md) / PouchProxy

# Class: PouchProxy

[facade-implementations/database/pouchdb-wrapper/__mocks__/PouchProxy](../modules/facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.md).PouchProxy

## Hierarchy

- [`PouchProxy`](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md)

  ↳ **`PouchProxy`**

## Table of contents

### Constructors

- [constructor](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md#constructor)

### Properties

- [db](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md#db)

### Methods

- [bulkDocs](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md#bulkdocs)
- [changes](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md#changes)
- [destroy](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md#destroy)
- [get](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md#get)
- [getRawDb](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md#getrawdb)
- [post](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md#post)
- [put](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md#put)
- [query](facade_implementations_database_pouchdb_wrapper___mocks___PouchProxy.PouchProxy.md#query)

## Constructors

### constructor

• **new PouchProxy**(`name`, `config`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Database name. |
| `config` | `DatabaseConfiguration` | Database configuration. |

#### Overrides

[PouchProxy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md).[constructor](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#constructor)

## Properties

### db

• `Protected` `Readonly` **db**: [`PouchDatabase`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Inherited from

[PouchProxy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md).[db](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#db)

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

#### Inherited from

[PouchProxy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md).[bulkDocs](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#bulkdocs)

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

#### Inherited from

[PouchProxy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md).[changes](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#changes)

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

Destroys database.

#### Returns

`Promise`<`void`\>

#### Inherited from

[PouchProxy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md).[destroy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#destroy)

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

#### Inherited from

[PouchProxy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md).[get](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#get)

___

### getRawDb

▸ **getRawDb**(): [`PouchDatabase`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

Returns original PouchDB database.

#### Returns

[`PouchDatabase`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

Original PouchDB database.

#### Inherited from

[PouchProxy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md).[getRawDb](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#getrawdb)

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

#### Inherited from

[PouchProxy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md).[post](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#post)

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

#### Inherited from

[PouchProxy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md).[put](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#put)

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

#### Inherited from

[PouchProxy](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md).[query](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md#query)
