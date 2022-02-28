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
| `options` | [`PouchDatabaseConfiguration`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabaseconfiguration) | Database options. |

## Properties

### db

• **db**: `Object`

## Methods

### bulkDocs

▸ **bulkDocs**(`docs`): `Promise`<(`Readonly`<`Error`\> \| `Readonly`<`Response`\>)[]\>

Creates or updates multiple documents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `docs` | readonly { `attachedDocs?`: readonly { readonly [x: string]: unknown; readonly \_id: number; readonly \_rev: number; readonly \_deleted?: true; }[] ; `lastAttachedDocs?`: readonly number[]  }[] | Documents. |

#### Returns

`Promise`<(`Readonly`<`Error`\> \| `Readonly`<`Response`\>)[]\>

Responses.

___

### changes

▸ **changes**(`changesHandler`, `options`): [`Changes`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Changes.md)

Subscribes to changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `changesHandler` | [`PouchChangesHandler`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchChangesHandler.md) | Changes handler. |
| `options` | `Object` | Options. |

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

▸ **get**(`id`): `Promise`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md) & {} & `Readonly`<`IdMeta`\>\>

Fetches document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID. |

#### Returns

`Promise`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md) & {} & `Readonly`<`IdMeta`\>\>

Document.

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
