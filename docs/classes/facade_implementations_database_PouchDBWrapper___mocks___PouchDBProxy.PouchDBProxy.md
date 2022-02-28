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

### Methods

- [bulkDocs](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#bulkdocs)
- [changes](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#changes)
- [destroy](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#destroy)
- [get](facade_implementations_database_PouchDBWrapper___mocks___PouchDBProxy.PouchDBProxy.md#get)
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

• **db**: `Object`

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[db](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#db)

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

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[bulkDocs](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#bulkdocs)

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

▸ **get**(`id`): `Promise`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md) & {} & `Readonly`<`IdMeta`\>\>

Fetches document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID. |

#### Returns

`Promise`<[`Content`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Content.md) & {} & `Readonly`<`IdMeta`\>\>

Document.

#### Inherited from

[PouchDBProxy](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md).[get](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md#get)

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
| `doc.lastAttachedDocs?` | readonly `number`[] | - |

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
