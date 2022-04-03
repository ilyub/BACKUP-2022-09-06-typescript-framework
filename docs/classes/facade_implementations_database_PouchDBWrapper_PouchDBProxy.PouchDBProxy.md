[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/PouchDBWrapper/PouchDBProxy](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md) / PouchDBProxy

# Class: PouchDBProxy

[facade-implementations/database/PouchDBWrapper/PouchDBProxy](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md).PouchDBProxy

## Hierarchy

- **`PouchDBProxy`**

  ↳ [`PouchDBProxy`](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md)

## Table of contents

### Constructors

- [constructor](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#constructor)

### Properties

- [db](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#db)

### Methods

- [bulkDocs](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#bulkdocs)
- [changes](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#changes)
- [destroy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#destroy)
- [get](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#get)
- [post](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#post)
- [put](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#put)
- [query](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#query)

## Constructors

### constructor

• **new PouchDBProxy**(`name`, `options`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Database name. |
| `options` | `DatabaseConfiguration` | Database options. |

## Properties

### db

• **db**: [`PouchDatabase`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabase)

## Methods

### bulkDocs

▸ **bulkDocs**(`docs`): `Promise`<(`Error` \| `Response`)[]\>

Creates or updates multiple documents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `docs` | readonly [`PouchPutDocument`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchputdocument)[] | Documents. |

#### Returns

`Promise`<(`Error` \| `Response`)[]\>

Responses.

___

### changes

▸ **changes**(`changesHandler`, `options`): [`Changes`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Changes.md)

Subscribes to changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `changesHandler` | [`PouchChangesHandler`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchChangesHandler.md) | Changes handler. |
| `options` | `ChangesOptions` | Options. |

#### Returns

[`Changes`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Changes.md)

Subscription ID.

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

Destroys database.

#### Returns

`Promise`<`void`\>

___

### get

▸ **get**(`id`): `Promise`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md) & `GetMeta` & `IdMeta`\>

Fetches document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID. |

#### Returns

`Promise`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md) & `GetMeta` & `IdMeta`\>

Document.

___

### post

▸ **post**(`doc`): `Promise`<`Response`\>

Posts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | [`PouchPutDocument`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchputdocument) | Document. |

#### Returns

`Promise`<`Response`\>

Response.

___

### put

▸ **put**(`doc`): `Promise`<`Response`\>

Puts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | [`PouchPutDocument`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchputdocument) | Document. |

#### Returns

`Promise`<`Response`\>

Response.

___

### query

▸ **query**(`mapReduce`, `options`): `Promise`<[`PouchQueryResponse`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchqueryresponse)\>

Queries database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapReduce` | `string` | The name of a view in an existing design document. |
| `options` | [`PouchQueryOptions`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchqueryoptions) | Options. |

#### Returns

`Promise`<[`PouchQueryResponse`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchqueryresponse)\>

Query response.
