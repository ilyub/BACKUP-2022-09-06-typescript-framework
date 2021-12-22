[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/PouchDBWrapper/Database](../modules/facade_implementations_database_PouchDBWrapper_Database.md) / Database

# Class: Database

[facade-implementations/database/PouchDBWrapper/Database](../modules/facade_implementations_database_PouchDBWrapper_Database.md).Database

## Implements

- `DatabaseInterface`

## Table of contents

### Constructors

- [constructor](facade_implementations_database_PouchDBWrapper_Database.Database.md#constructor)

### Properties

- [changes](facade_implementations_database_PouchDBWrapper_Database.Database.md#changes)
- [changesHandlersAttachedPool](facade_implementations_database_PouchDBWrapper_Database.Database.md#changeshandlersattachedpool)
- [changesHandlersPool](facade_implementations_database_PouchDBWrapper_Database.Database.md#changeshandlerspool)
- [config](facade_implementations_database_PouchDBWrapper_Database.Database.md#config)
- [db](facade_implementations_database_PouchDBWrapper_Database.Database.md#db)
- [name](facade_implementations_database_PouchDBWrapper_Database.Database.md#name)
- [options](facade_implementations_database_PouchDBWrapper_Database.Database.md#options)
- [pouchConfig](facade_implementations_database_PouchDBWrapper_Database.Database.md#pouchconfig)

### Methods

- [bulkDocs](facade_implementations_database_PouchDBWrapper_Database.Database.md#bulkdocs)
- [count](facade_implementations_database_PouchDBWrapper_Database.Database.md#count)
- [countAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#countattached)
- [exists](facade_implementations_database_PouchDBWrapper_Database.Database.md#exists)
- [existsAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#existsattached)
- [get](facade_implementations_database_PouchDBWrapper_Database.Database.md#get)
- [getAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#getattached)
- [getAttachedIfExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#getattachedifexists)
- [getDb](facade_implementations_database_PouchDBWrapper_Database.Database.md#getdb)
- [getIfExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#getifexists)
- [getRawDb](facade_implementations_database_PouchDBWrapper_Database.Database.md#getrawdb)
- [mapReduce](facade_implementations_database_PouchDBWrapper_Database.Database.md#mapreduce)
- [mapReduceAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#mapreduceattached)
- [migrate](facade_implementations_database_PouchDBWrapper_Database.Database.md#migrate)
- [put](facade_implementations_database_PouchDBWrapper_Database.Database.md#put)
- [putAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#putattached)
- [putAttachedIfNotExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#putattachedifnotexists)
- [putIfNotExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#putifnotexists)
- [query](facade_implementations_database_PouchDBWrapper_Database.Database.md#query)
- [queryAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#queryattached)
- [rawQuery](facade_implementations_database_PouchDBWrapper_Database.Database.md#rawquery)
- [refreshSubscription](facade_implementations_database_PouchDBWrapper_Database.Database.md#refreshsubscription)
- [reset](facade_implementations_database_PouchDBWrapper_Database.Database.md#reset)
- [subscribe](facade_implementations_database_PouchDBWrapper_Database.Database.md#subscribe)
- [subscribeAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#subscribeattached)
- [unsettled](facade_implementations_database_PouchDBWrapper_Database.Database.md#unsettled)
- [unsettledAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#unsettledattached)
- [unsubscribe](facade_implementations_database_PouchDBWrapper_Database.Database.md#unsubscribe)
- [unsubscribeAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#unsubscribeattached)

## Constructors

### constructor

• **new Database**(`name`, `options?`, `config?`, `pouchConfig?`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Database name. |
| `options` | `DatabaseOptions` | Database options. |
| `config` | [`Configuration`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.Configuration.md) | Configuration. |
| `pouchConfig` | [`PouchDatabaseConfiguration`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabaseconfiguration) | PouchDB configuration. |

## Properties

### changes

• `Protected` **changes**: `undefined` \| [`Changes`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Changes.md) = `undefined`

___

### changesHandlersAttachedPool

• `Protected` **changesHandlersAttachedPool**: `Map`<`Symbol`, `AttachedChangesHandler`\>

___

### changesHandlersPool

• `Protected` **changesHandlersPool**: `Map`<`Symbol`, `ChangesHandler`\>

___

### config

• `Protected` **config**: `Required`<[`Configuration`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.Configuration.md)\>

___

### db

• `Protected` **db**: `undefined` \| [`PouchDBProxy`](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md) = `undefined`

___

### name

• `Protected` **name**: `string`

___

### options

• `Protected` **options**: `Required`<`DatabaseOptions`\>

___

### pouchConfig

• `Protected` **pouchConfig**: [`PouchDatabaseConfiguration`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabaseconfiguration)

## Methods

### bulkDocs

▸ **bulkDocs**(`docs`): `Promise`<`PutResponses`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `docs` | `PutDocuments` |

#### Returns

`Promise`<`PutResponses`\>

#### Implementation of

DatabaseInterface.bulkDocs

___

### count

▸ **count**(`conditions`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Readonly`<`Record`<`string`, `Condition`\>\> |

#### Returns

`Promise`<`number`\>

#### Implementation of

DatabaseInterface.count

___

### countAttached

▸ **countAttached**(`conditions`, `parentConditions?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Readonly`<`Record`<`string`, `Condition`\>\> |
| `parentConditions` | `Readonly`<`Record`<`string`, `Condition`\>\> |

#### Returns

`Promise`<`number`\>

#### Implementation of

DatabaseInterface.countAttached

___

### exists

▸ **exists**(`id`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

DatabaseInterface.exists

___

### existsAttached

▸ **existsAttached**(`id`, `parentId`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

DatabaseInterface.existsAttached

___

### get

▸ **get**(`id`): `Promise`<`ExistingDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`ExistingDocument`\>

#### Implementation of

DatabaseInterface.get

___

### getAttached

▸ **getAttached**(`id`, `parentId`): `Promise`<`ExistingAttachedDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`Promise`<`ExistingAttachedDocument`\>

#### Implementation of

DatabaseInterface.getAttached

___

### getAttachedIfExists

▸ **getAttachedIfExists**(`id`, `parentId`): `Promise`<`undefined` \| `ExistingAttachedDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`Promise`<`undefined` \| `ExistingAttachedDocument`\>

#### Implementation of

DatabaseInterface.getAttachedIfExists

___

### getDb

▸ `Protected` **getDb**(): `Promise`<[`PouchDBProxy`](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md)\>

Returns PouchDBProxy instance.

#### Returns

`Promise`<[`PouchDBProxy`](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md)\>

PouchDBProxy instance.

___

### getIfExists

▸ **getIfExists**(`id`): `Promise`<`undefined` \| `ExistingDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`undefined` \| `ExistingDocument`\>

#### Implementation of

DatabaseInterface.getIfExists

___

### getRawDb

▸ **getRawDb**(): `Promise`<{}\>

Returns original PouchDB database.

#### Returns

`Promise`<{}\>

Original PouchDB database.

___

### mapReduce

▸ `Protected` **mapReduce**(`options`, `rawQueryOptions`): [`MapReduce`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.MapReduce.md)

Creates map/reduce.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `QueryOptions` | Options. |
| `rawQueryOptions` | [`RawQueryOptions`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryOptions.md) | Raw query options. |

#### Returns

[`MapReduce`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.MapReduce.md)

Map/reduce.

___

### mapReduceAttached

▸ `Protected` **mapReduceAttached**(`options`, `rawQueryOptions`): [`MapReduce`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.MapReduce.md)

Creates map/reduce.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `QueryOptions` | Options. |
| `rawQueryOptions` | [`RawQueryOptionsAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryOptionsAttached.md) | Raw query options. |

#### Returns

[`MapReduce`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.MapReduce.md)

Map/reduce.

___

### migrate

▸ `Protected` **migrate**(): `Promise`<`void`\>

Runs migrations.

#### Returns

`Promise`<`void`\>

___

### put

▸ **put**(`doc`): `Promise`<`PutResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `PutDocument` |

#### Returns

`Promise`<`PutResponse`\>

#### Implementation of

DatabaseInterface.put

___

### putAttached

▸ **putAttached**(`parentId`, `doc`): `Promise`<`PutAttachedResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentId` | `string` |
| `doc` | `PutAttachedDocument` |

#### Returns

`Promise`<`PutAttachedResponse`\>

#### Implementation of

DatabaseInterface.putAttached

___

### putAttachedIfNotExists

▸ **putAttachedIfNotExists**(`parentId`, `doc`): `Promise`<`undefined` \| `PutAttachedResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentId` | `string` |
| `doc` | `PutAttachedDocument` |

#### Returns

`Promise`<`undefined` \| `PutAttachedResponse`\>

#### Implementation of

DatabaseInterface.putAttachedIfNotExists

___

### putIfNotExists

▸ **putIfNotExists**(`doc`): `Promise`<`undefined` \| `PutResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `PutDocument` |

#### Returns

`Promise`<`undefined` \| `PutResponse`\>

#### Implementation of

DatabaseInterface.putIfNotExists

___

### query

▸ **query**(`conditions`, `options?`): `Promise`<`ExistingDocuments`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Readonly`<`Record`<`string`, `Condition`\>\> |
| `options` | `QueryOptions` |

#### Returns

`Promise`<`ExistingDocuments`\>

#### Implementation of

DatabaseInterface.query

___

### queryAttached

▸ **queryAttached**(`conditions`, `parentConditions?`, `options?`): `Promise`<`ExistingAttachedDocuments`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Readonly`<`Record`<`string`, `Condition`\>\> |
| `parentConditions` | `Readonly`<`Record`<`string`, `Condition`\>\> |
| `options` | `QueryOptions` |

#### Returns

`Promise`<`ExistingAttachedDocuments`\>

#### Implementation of

DatabaseInterface.queryAttached

___

### rawQuery

▸ `Protected` **rawQuery**(`options`, `rawQueryOptions`): `Promise`<[`RawQueryResponse`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryResponse.md)\>

Performs database query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `QueryOptions` | Options. |
| `rawQueryOptions` | [`RawQueryOptions`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryOptions.md) \| [`RawQueryOptionsAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryOptionsAttached.md) | Raw query options. |

#### Returns

`Promise`<[`RawQueryResponse`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.RawQueryResponse.md)\>

Documents.

___

### refreshSubscription

▸ `Protected` **refreshSubscription**(): `Promise`<`void`\>

Refreshes subscriptions.

#### Returns

`Promise`<`void`\>

___

### reset

▸ **reset**(`callback?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | `ResetCallback` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DatabaseInterface.reset

___

### subscribe

▸ **subscribe**(`handler`): `Promise`<`Symbol`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `ChangesHandler` |

#### Returns

`Promise`<`Symbol`\>

#### Implementation of

DatabaseInterface.subscribe

___

### subscribeAttached

▸ **subscribeAttached**(`handler`): `Promise`<`Symbol`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `AttachedChangesHandler` |

#### Returns

`Promise`<`Symbol`\>

#### Implementation of

DatabaseInterface.subscribeAttached

___

### unsettled

▸ **unsettled**(`conditions`, `options?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Readonly`<`Record`<`string`, `Condition`\>\> |
| `options` | `QueryOptions` |

#### Returns

`Promise`<`number`\>

#### Implementation of

DatabaseInterface.unsettled

___

### unsettledAttached

▸ **unsettledAttached**(`conditions`, `parentConditions?`, `options?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Readonly`<`Record`<`string`, `Condition`\>\> |
| `parentConditions` | `Readonly`<`Record`<`string`, `Condition`\>\> |
| `options` | `QueryOptions` |

#### Returns

`Promise`<`number`\>

#### Implementation of

DatabaseInterface.unsettledAttached

___

### unsubscribe

▸ **unsubscribe**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `Symbol` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DatabaseInterface.unsubscribe

___

### unsubscribeAttached

▸ **unsubscribeAttached**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `Symbol` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DatabaseInterface.unsubscribeAttached
