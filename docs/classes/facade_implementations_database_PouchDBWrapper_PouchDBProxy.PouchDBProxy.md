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
- [name](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#name)
- [options](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#options)
- [pouchDBConstructor](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#pouchdbconstructor)

### Methods

- [bulkDocs](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#bulkdocs)
- [changes](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#changes)
- [destroy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#destroy)
- [get](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#get)
- [getDb](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#getdb)
- [getPouchDBConstructor](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#getpouchdbconstructor)
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
| `options` | [`PouchDatabaseConfiguration`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabaseconfiguration) | Database options. |

## Properties

### db

• `Protected` **db**: `undefined` \| {}

___

### name

• `Protected` **name**: `string`

___

### options

• `Protected` **options**: [`PouchDatabaseConfiguration`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabaseconfiguration)

___

### pouchDBConstructor

▪ `Static` `Protected` **pouchDBConstructor**: `undefined` \| `Promise`<`Static`<{}\>\>

## Methods

### bulkDocs

▸ **bulkDocs**(`docs`): `Promise`<(`Readonly`<`Response`\> \| `Readonly`<`Error`\>)[]\>

Creates or updates multiple documents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `docs` | readonly { `attachedDocs?`: readonly { readonly [x: string]: unknown; readonly \_id: number; readonly \_rev: number; readonly \_deleted?: true; }[] ; `lastAttachedDocs?`: readonly number[]  }[] | Documents. |

#### Returns

`Promise`<(`Readonly`<`Response`\> \| `Readonly`<`Error`\>)[]\>

Responses.

___

### changes

▸ **changes**(`changesHandler`, `options`): `Promise`<[`Changes`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Changes.md)\>

Subscribes to changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `changesHandler` | [`PouchChangesHandler`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchchangeshandler) | Changes handler. |
| `options` | `Object` | Options. |

#### Returns

`Promise`<[`Changes`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Changes.md)\>

Subscription ID.

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

Destroys database.

#### Returns

`Promise`<`void`\>

___

### get

▸ **get**(`id`): `Promise`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md) & `Readonly`<`IdMeta`\> & {}\>

Fetches document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID. |

#### Returns

`Promise`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md) & `Readonly`<`IdMeta`\> & {}\>

Document.

___

### getDb

▸ **getDb**(): `Promise`<{}\>

Returns original PouchDB database.

#### Returns

`Promise`<{}\>

Original PouchDB database.

___

### getPouchDBConstructor

▸ `Protected` **getPouchDBConstructor**(): `Promise`<`Static`<{}\>\>

Returns PouchDB constructor.

#### Returns

`Promise`<`Static`<{}\>\>

PouchDB constructor.

___

### post

▸ **post**(`doc`): `Promise`<`Readonly`<`Response`\>\>

Posts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | `Object` | Document. |
| `doc.attachedDocs?` | readonly { readonly [x: string]: unknown; readonly \_id: number; readonly \_rev: number; readonly \_deleted?: true; }[] | - |
| `doc.lastAttachedDocs?` | readonly `number`[] | - |

#### Returns

`Promise`<`Readonly`<`Response`\>\>

Response.

___

### put

▸ **put**(`doc`): `Promise`<`Readonly`<`Response`\>\>

Puts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | `Object` | Document. |
| `doc.attachedDocs?` | readonly { readonly [x: string]: unknown; readonly \_id: number; readonly \_rev: number; readonly \_deleted?: true; }[] | - |
| `doc.lastAttachedDocs?` | readonly `number`[] | - |

#### Returns

`Promise`<`Readonly`<`Response`\>\>

Response.

___

### query

▸ **query**(`mapReduce`, `options`): `Promise`<{}\>

Queries database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapReduce` | `string` | The name of a view in an existing design document. |
| `options` | `Object` | Options. |

#### Returns

`Promise`<{}\>

Query response.
