[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/PouchDBWrapper/\_\_mocks\_\_/PouchDBProxy](../modules/facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.md) / PouchDBProxy

# Class: PouchDBProxy

[facade-implementations/database/PouchDBWrapper/__mocks__/PouchDBProxy](../modules/facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.md).PouchDBProxy

## Hierarchy

- [`PouchDBProxy`](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md)

  ↳ **`PouchDBProxy`**

## Table of contents

### Constructors

- [constructor](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#constructor)

### Properties

- [db](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#db)
- [name](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#name)
- [options](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#options)
- [pouchDBConstructor](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#pouchdbconstructor)

### Methods

- [bulkDocs](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#bulkdocs)
- [changes](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#changes)
- [destroy](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#destroy)
- [get](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#get)
- [getDb](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#getdb)
- [getPouchDBConstructor](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#getpouchdbconstructor)
- [post](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#post)
- [put](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#put)
- [query](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#query)

## Constructors

### constructor

• **new PouchDBProxy**(`name`, `options`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Database name. |
| `options` | [`PouchDatabaseConfiguration`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabaseconfiguration) | Database options. |

#### Overrides

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[constructor](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#constructor)

## Properties

### db

• `Protected` **db**: `undefined` \| {}

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[db](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#db)

___

### name

• `Protected` **name**: `string`

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[name](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#name)

___

### options

• `Protected` **options**: [`PouchDatabaseConfiguration`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabaseconfiguration)

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[options](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#options)

___

### pouchDBConstructor

▪ `Static` `Protected` **pouchDBConstructor**: `undefined` \| `Promise`<`Static`\>

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[pouchDBConstructor](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#pouchdbconstructor)

## Methods

### bulkDocs

▸ **bulkDocs**(`docs`): `Promise`<(`Readonly`<`Response`\> \| `Readonly`<`Error`\>)[]\>

Creates or updates multiple documents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `docs` | readonly { `attachedDocs?`: readonly { readonly [x: string]: unknown; readonly \_id: number; readonly \_rev: number; readonly \_deleted?: true; }[] ; `lastAttachedDoc?`: `number`  }[] | Documents. |

#### Returns

`Promise`<(`Readonly`<`Response`\> \| `Readonly`<`Error`\>)[]\>

Responses.

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[bulkDocs](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#bulkdocs)

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

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[changes](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#changes)

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

Destroys database.

#### Returns

`Promise`<`void`\>

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[destroy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#destroy)

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

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[get](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#get)

___

### getDb

▸ **getDb**(): `Promise`<{}\>

Returns original PouchDB database.

#### Returns

`Promise`<{}\>

Original PouchDB database.

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[getDb](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#getdb)

___

### getPouchDBConstructor

▸ `Protected` **getPouchDBConstructor**(): `Promise`<`Static`\>

Returns PouchDB constructor.

#### Returns

`Promise`<`Static`\>

PouchDB constructor.

#### Overrides

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[getPouchDBConstructor](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#getpouchdbconstructor)

___

### post

▸ **post**(`doc`): `Promise`<`Readonly`<`Response`\>\>

Posts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | `Object` | Document. |
| `doc.attachedDocs?` | readonly { readonly [x: string]: unknown; readonly \_id: number; readonly \_rev: number; readonly \_deleted?: true; }[] | - |
| `doc.lastAttachedDoc?` | `number` | - |

#### Returns

`Promise`<`Readonly`<`Response`\>\>

Response.

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[post](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#post)

___

### put

▸ **put**(`doc`): `Promise`<`Readonly`<`Response`\>\>

Puts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | `Object` | Document. |
| `doc.attachedDocs?` | readonly { readonly [x: string]: unknown; readonly \_id: number; readonly \_rev: number; readonly \_deleted?: true; }[] | - |
| `doc.lastAttachedDoc?` | `number` | - |

#### Returns

`Promise`<`Readonly`<`Response`\>\>

Response.

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[put](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#put)

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

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[query](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#query)
