[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouch-db-wrapper/\_\_mocks\_\_/PouchDBProxy](../modules/facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.md) / PouchDBProxy

# Class: PouchDBProxy

[facade-implementations/database/pouch-db-wrapper/__mocks__/PouchDBProxy](../modules/facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.md).PouchDBProxy

## Hierarchy

- [`PouchDBProxy`](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md)

  ↳ **`PouchDBProxy`**

## Table of contents

### Constructors

- [constructor](facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.PouchDBProxy.md#constructor)

### Properties

- [db](facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.PouchDBProxy.md#db)

### Methods

- [bulkDocs](facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.PouchDBProxy.md#bulkdocs)
- [changes](facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.PouchDBProxy.md#changes)
- [destroy](facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.PouchDBProxy.md#destroy)
- [get](facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.PouchDBProxy.md#get)
- [post](facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.PouchDBProxy.md#post)
- [put](facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.PouchDBProxy.md#put)
- [query](facade_implementations_database_pouch_db_wrapper___mocks___PouchDBProxy.PouchDBProxy.md#query)

## Constructors

### constructor

• **new PouchDBProxy**(`name`, `options`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Database name. |
| `options` | `DatabaseConfiguration` | Database options. |

#### Overrides

[PouchDBProxy](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md).[constructor](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md#constructor)

## Properties

### db

• `Readonly` **db**: [`PouchDatabase`](../modules/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchdatabase)

#### Inherited from

[PouchDBProxy](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md).[db](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md#db)

## Methods

### bulkDocs

▸ **bulkDocs**(`docs`): `Promise`<(`Error` \| `Response`)[]\>

Creates or updates multiple documents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `docs` | [`PouchPutDocuments`](../modules/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchputdocuments) | Documents. |

#### Returns

`Promise`<(`Error` \| `Response`)[]\>

Responses.

#### Inherited from

[PouchDBProxy](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md).[bulkDocs](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md#bulkdocs)

___

### changes

▸ **changes**(`changesHandler`, `options`): [`Changes`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Changes.md)

Subscribes to changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `changesHandler` | [`PouchChangesHandler`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchChangesHandler.md) | Changes handler. |
| `options` | `ChangesOptions` | Options. |

#### Returns

[`Changes`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Changes.md)

Subscription ID.

#### Inherited from

[PouchDBProxy](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md).[changes](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md#changes)

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

Destroys database.

#### Returns

`Promise`<`void`\>

#### Inherited from

[PouchDBProxy](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md).[destroy](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md#destroy)

___

### get

▸ **get**(`id`): `Promise`<[`Content`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Content.md) & `GetMeta` & `IdMeta`\>

Fetches document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID. |

#### Returns

`Promise`<[`Content`](../interfaces/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.Content.md) & `GetMeta` & `IdMeta`\>

Document.

#### Inherited from

[PouchDBProxy](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md).[get](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md#get)

___

### post

▸ **post**(`doc`): `Promise`<`Response`\>

Posts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | [`PouchPutDocument`](../modules/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchputdocument) | Document. |

#### Returns

`Promise`<`Response`\>

Response.

#### Inherited from

[PouchDBProxy](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md).[post](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md#post)

___

### put

▸ **put**(`doc`): `Promise`<`Response`\>

Puts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | [`PouchPutDocument`](../modules/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchputdocument) | Document. |

#### Returns

`Promise`<`Response`\>

Response.

#### Inherited from

[PouchDBProxy](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md).[put](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md#put)

___

### query

▸ **query**(`mapReduce`, `options`): `Promise`<[`PouchQueryResponse`](../modules/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchqueryresponse)\>

Queries database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapReduce` | `string` | The name of a view in an existing design document. |
| `options` | [`PouchQueryOptions`](../modules/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchqueryoptions) | Options. |

#### Returns

`Promise`<[`PouchQueryResponse`](../modules/facade_implementations_database_pouch_db_wrapper_PouchDBProxy.md#pouchqueryresponse)\>

Query response.

#### Inherited from

[PouchDBProxy](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md).[query](facade_implementations_database_pouch_db_wrapper_PouchDBProxy.PouchDBProxy.md#query)
