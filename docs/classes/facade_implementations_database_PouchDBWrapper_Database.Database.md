[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/PouchDBWrapper/Database](../modules/facade_implementations_database_PouchDBWrapper_Database.md) / Database

# Class: Database

[facade-implementations/database/PouchDBWrapper/Database](../modules/facade_implementations_database_PouchDBWrapper_Database.md).Database

## Implements

- `Database`

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

- [bulkAttachedDocs](facade_implementations_database_PouchDBWrapper_Database.Database.md#bulkattacheddocs)
- [bulkDocs](facade_implementations_database_PouchDBWrapper_Database.Database.md#bulkdocs)
- [bulkExistingAttachedDocs](facade_implementations_database_PouchDBWrapper_Database.Database.md#bulkexistingattacheddocs)
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
- [reactiveCount](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivecount)
- [reactiveCountAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivecountasync)
- [reactiveCountAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivecountattached)
- [reactiveCountAttachedAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivecountattachedasync)
- [reactiveExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveexists)
- [reactiveExistsAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveexistsasync)
- [reactiveExistsAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveexistsattached)
- [reactiveExistsAttachedAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveexistsattachedasync)
- [reactiveFactoryGet](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactoryget)
- [reactiveFactoryGetAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactorygetasync)
- [reactiveFactoryGetAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactorygetattached)
- [reactiveFactoryGetAttachedAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactorygetattachedasync)
- [reactiveFactoryQuery](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactoryquery)
- [reactiveFactoryQueryAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactoryqueryasync)
- [reactiveFactoryQueryAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactoryqueryattached)
- [reactiveFactoryQueryAttachedAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactoryqueryattachedasync)
- [reactiveGet](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveget)
- [reactiveGetAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivegetasync)
- [reactiveGetAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivegetattached)
- [reactiveGetAttachedAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivegetattachedasync)
- [reactiveGetAttachedIfExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivegetattachedifexists)
- [reactiveGetAttachedIfExistsAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivegetattachedifexistsasync)
- [reactiveGetIfExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivegetifexists)
- [reactiveGetIfExistsAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivegetifexistsasync)
- [reactiveHandlerExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlerexists)
- [reactiveHandlerExistsAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlerexistsattached)
- [reactiveHandlerGet](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlerget)
- [reactiveHandlerGetAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlergetattached)
- [reactiveHandlerGetAttachedIfExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlergetattachedifexists)
- [reactiveHandlerGetIfExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlergetifexists)
- [reactiveQuery](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivequery)
- [reactiveQueryAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivequeryasync)
- [reactiveQueryAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivequeryattached)
- [reactiveQueryAttachedAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivequeryattachedasync)
- [reactiveUnsettled](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveunsettled)
- [reactiveUnsettledAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveunsettledasync)
- [reactiveUnsettledAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveunsettledattached)
- [reactiveUnsettledAttachedAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveunsettledattachedasync)
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

### bulkAttachedDocs

▸ **bulkAttachedDocs**(`parentId`, `docs`): `Promise`<`PutAttachedResponses`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentId` | `string` |
| `docs` | `PutAttachedDocuments` |

#### Returns

`Promise`<`PutAttachedResponses`\>

#### Implementation of

DatabaseInterface.bulkAttachedDocs

___

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

### bulkExistingAttachedDocs

▸ **bulkExistingAttachedDocs**(`docs`): `Promise`<`PutAttachedResponses`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `docs` | `ExistingAttachedDocuments` |

#### Returns

`Promise`<`PutAttachedResponses`\>

#### Implementation of

DatabaseInterface.bulkExistingAttachedDocs

___

### count

▸ **count**(`conditions?`): `Promise`<`number`\>

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

▸ **countAttached**(`conditions?`, `parentConditions?`): `Promise`<`number`\>

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

▸ **query**(`conditions?`, `options?`): `Promise`<`ExistingDocuments`\>

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

▸ **queryAttached**(`conditions?`, `parentConditions?`, `options?`): `Promise`<`ExistingAttachedDocuments`\>

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

### reactiveCount

▸ **reactiveCount**(`config`): `ReactiveResponse`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfig` |

#### Returns

`ReactiveResponse`<`number`\>

#### Implementation of

DatabaseInterface.reactiveCount

___

### reactiveCountAsync

▸ **reactiveCountAsync**(`config`): `Promise`<`ReactiveResponseAsync`<`number`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfig` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`number`\>\>

#### Implementation of

DatabaseInterface.reactiveCountAsync

___

### reactiveCountAttached

▸ **reactiveCountAttached**(`config`): `ReactiveResponse`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfigAttached` |

#### Returns

`ReactiveResponse`<`number`\>

#### Implementation of

DatabaseInterface.reactiveCountAttached

___

### reactiveCountAttachedAsync

▸ **reactiveCountAttachedAsync**(`config`): `Promise`<`ReactiveResponseAsync`<`number`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfigAttached` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`number`\>\>

#### Implementation of

DatabaseInterface.reactiveCountAttachedAsync

___

### reactiveExists

▸ **reactiveExists**(`id`): `ReactiveResponse`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`ReactiveResponse`<`boolean`\>

#### Implementation of

DatabaseInterface.reactiveExists

___

### reactiveExistsAsync

▸ **reactiveExistsAsync**(`id`): `Promise`<`ReactiveResponseAsync`<`boolean`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`boolean`\>\>

#### Implementation of

DatabaseInterface.reactiveExistsAsync

___

### reactiveExistsAttached

▸ **reactiveExistsAttached**(`id`, `parentId`): `ReactiveResponse`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`ReactiveResponse`<`boolean`\>

#### Implementation of

DatabaseInterface.reactiveExistsAttached

___

### reactiveExistsAttachedAsync

▸ **reactiveExistsAttachedAsync**(`id`, `parentId`): `Promise`<`ReactiveResponseAsync`<`boolean`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`boolean`\>\>

#### Implementation of

DatabaseInterface.reactiveExistsAttachedAsync

___

### reactiveFactoryGet

▸ `Protected` **reactiveFactoryGet**<`T`\>(`request`, `handler`): `ReactiveResponse`<`T`\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Promise`<`T`\> | Request. |
| `handler` | [`ReactiveHandler`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandler.md)<`T`\> | Handler. |

#### Returns

`ReactiveResponse`<`T`\>

Reactive response.

___

### reactiveFactoryGetAsync

▸ `Protected` **reactiveFactoryGetAsync**<`T`\>(`request`, `handler`, `result?`): `Promise`<`ReactiveResponseAsync`<`T`\>\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Promise`<`T`\> | Request. |
| `handler` | [`ReactiveHandler`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandler.md)<`T`\> | Handler. |
| `result?` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

#### Returns

`Promise`<`ReactiveResponseAsync`<`T`\>\>

Reactive response.

___

### reactiveFactoryGetAttached

▸ `Protected` **reactiveFactoryGetAttached**<`T`\>(`request`, `handler`): `ReactiveResponse`<`T`\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Promise`<`T`\> | Request. |
| `handler` | [`ReactiveHandlerAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandlerAttached.md)<`T`\> | Handler. |

#### Returns

`ReactiveResponse`<`T`\>

Reactive response.

___

### reactiveFactoryGetAttachedAsync

▸ `Protected` **reactiveFactoryGetAttachedAsync**<`T`\>(`request`, `handler`, `result?`): `Promise`<`ReactiveResponseAsync`<`T`\>\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Promise`<`T`\> | Request. |
| `handler` | [`ReactiveHandlerAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandlerAttached.md)<`T`\> | Handler. |
| `result?` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

#### Returns

`Promise`<`ReactiveResponseAsync`<`T`\>\>

Reactive response.

___

### reactiveFactoryQuery

▸ `Protected` **reactiveFactoryQuery**<`T`\>(`request`, `config`): `ReactiveResponse`<`T`\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`ReactiveRequest`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveRequest.md)<`T`\> | Request. |
| `config` | `ReactiveConfig` | Configuration. |

#### Returns

`ReactiveResponse`<`T`\>

Reactive response.

___

### reactiveFactoryQueryAsync

▸ `Protected` **reactiveFactoryQueryAsync**<`T`\>(`request`, `config`, `result?`): `Promise`<`ReactiveResponseAsync`<`T`\>\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`ReactiveRequest`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveRequest.md)<`T`\> | Request. |
| `config` | `ReactiveConfig` | Configuration. |
| `result?` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

#### Returns

`Promise`<`ReactiveResponseAsync`<`T`\>\>

Reactive response.

___

### reactiveFactoryQueryAttached

▸ `Protected` **reactiveFactoryQueryAttached**<`T`\>(`request`, `config`): `ReactiveResponse`<`T`\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`ReactiveRequestAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveRequestAttached.md)<`T`\> | Request. |
| `config` | `ReactiveConfigAttached` | Configuration. |

#### Returns

`ReactiveResponse`<`T`\>

Reactive response.

___

### reactiveFactoryQueryAttachedAsync

▸ `Protected` **reactiveFactoryQueryAttachedAsync**<`T`\>(`request`, `config`, `result?`): `Promise`<`ReactiveResponseAsync`<`T`\>\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`ReactiveRequestAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveRequestAttached.md)<`T`\> | Request. |
| `config` | `ReactiveConfigAttached` | Configuration. |
| `result?` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

#### Returns

`Promise`<`ReactiveResponseAsync`<`T`\>\>

Reactive response.

___

### reactiveGet

▸ **reactiveGet**(`id`): `ReactiveResponse`<`ExistingDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`ReactiveResponse`<`ExistingDocument`\>

#### Implementation of

DatabaseInterface.reactiveGet

___

### reactiveGetAsync

▸ **reactiveGetAsync**(`id`): `Promise`<`ReactiveResponseAsync`<`ExistingDocument`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`ExistingDocument`\>\>

#### Implementation of

DatabaseInterface.reactiveGetAsync

___

### reactiveGetAttached

▸ **reactiveGetAttached**(`id`, `parentId`): `ReactiveResponse`<`ExistingAttachedDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`ReactiveResponse`<`ExistingAttachedDocument`\>

#### Implementation of

DatabaseInterface.reactiveGetAttached

___

### reactiveGetAttachedAsync

▸ **reactiveGetAttachedAsync**(`id`, `parentId`): `Promise`<`ReactiveResponseAsync`<`ExistingAttachedDocument`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`ExistingAttachedDocument`\>\>

#### Implementation of

DatabaseInterface.reactiveGetAttachedAsync

___

### reactiveGetAttachedIfExists

▸ **reactiveGetAttachedIfExists**(`id`, `parentId`): `ReactiveResponse`<`undefined` \| `ExistingAttachedDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`ReactiveResponse`<`undefined` \| `ExistingAttachedDocument`\>

#### Implementation of

DatabaseInterface.reactiveGetAttachedIfExists

___

### reactiveGetAttachedIfExistsAsync

▸ **reactiveGetAttachedIfExistsAsync**(`id`, `parentId`): `Promise`<`ReactiveResponseAsync`<`undefined` \| `ExistingAttachedDocument`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`undefined` \| `ExistingAttachedDocument`\>\>

#### Implementation of

DatabaseInterface.reactiveGetAttachedIfExistsAsync

___

### reactiveGetIfExists

▸ **reactiveGetIfExists**(`id`): `ReactiveResponse`<`undefined` \| `ExistingDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`ReactiveResponse`<`undefined` \| `ExistingDocument`\>

#### Implementation of

DatabaseInterface.reactiveGetIfExists

___

### reactiveGetIfExistsAsync

▸ **reactiveGetIfExistsAsync**(`id`): `Promise`<`ReactiveResponseAsync`<`undefined` \| `ExistingDocument`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`undefined` \| `ExistingDocument`\>\>

#### Implementation of

DatabaseInterface.reactiveGetIfExistsAsync

___

### reactiveHandlerExists

▸ `Protected` **reactiveHandlerExists**(`id`): [`ReactiveHandler`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandler.md)<`boolean`\>

Reactive handler factory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID. |

#### Returns

[`ReactiveHandler`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandler.md)<`boolean`\>

Reactive handler.

___

### reactiveHandlerExistsAttached

▸ `Protected` **reactiveHandlerExistsAttached**(`id`, `parentId`): [`ReactiveHandlerAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandlerAttached.md)<`boolean`\>

Reactive handler factory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | ID. |
| `parentId` | `string` | Parent ID. |

#### Returns

[`ReactiveHandlerAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandlerAttached.md)<`boolean`\>

Reactive handler.

___

### reactiveHandlerGet

▸ `Protected` **reactiveHandlerGet**(`id`): [`ReactiveHandler`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandler.md)<`ExistingDocument`\>

Reactive handler factory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID. |

#### Returns

[`ReactiveHandler`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandler.md)<`ExistingDocument`\>

Reactive handler.

___

### reactiveHandlerGetAttached

▸ `Protected` **reactiveHandlerGetAttached**(`id`, `parentId`): [`ReactiveHandlerAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandlerAttached.md)<`ExistingAttachedDocument`\>

Reactive handler factory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | ID. |
| `parentId` | `string` | Parent ID. |

#### Returns

[`ReactiveHandlerAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandlerAttached.md)<`ExistingAttachedDocument`\>

Reactive handler.

___

### reactiveHandlerGetAttachedIfExists

▸ `Protected` **reactiveHandlerGetAttachedIfExists**(`id`, `parentId`): [`ReactiveHandlerAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandlerAttached.md)<`undefined` \| `ExistingAttachedDocument`\>

Reactive handler factory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | ID. |
| `parentId` | `string` | Parent ID. |

#### Returns

[`ReactiveHandlerAttached`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandlerAttached.md)<`undefined` \| `ExistingAttachedDocument`\>

Reactive handler.

___

### reactiveHandlerGetIfExists

▸ `Protected` **reactiveHandlerGetIfExists**(`id`): [`ReactiveHandler`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandler.md)<`undefined` \| `ExistingDocument`\>

Reactive handler factory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID. |

#### Returns

[`ReactiveHandler`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.ReactiveHandler.md)<`undefined` \| `ExistingDocument`\>

Reactive handler.

___

### reactiveQuery

▸ **reactiveQuery**(`config`): `ReactiveResponse`<`ExistingDocuments`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfig` |

#### Returns

`ReactiveResponse`<`ExistingDocuments`\>

#### Implementation of

DatabaseInterface.reactiveQuery

___

### reactiveQueryAsync

▸ **reactiveQueryAsync**(`config`): `Promise`<`ReactiveResponseAsync`<`ExistingDocuments`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfig` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`ExistingDocuments`\>\>

#### Implementation of

DatabaseInterface.reactiveQueryAsync

___

### reactiveQueryAttached

▸ **reactiveQueryAttached**(`config`): `ReactiveResponse`<`ExistingAttachedDocuments`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfigAttached` |

#### Returns

`ReactiveResponse`<`ExistingAttachedDocuments`\>

#### Implementation of

DatabaseInterface.reactiveQueryAttached

___

### reactiveQueryAttachedAsync

▸ **reactiveQueryAttachedAsync**(`config`): `Promise`<`ReactiveResponseAsync`<`ExistingAttachedDocuments`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfigAttached` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`ExistingAttachedDocuments`\>\>

#### Implementation of

DatabaseInterface.reactiveQueryAttachedAsync

___

### reactiveUnsettled

▸ **reactiveUnsettled**(`config`): `ReactiveResponse`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfig` |

#### Returns

`ReactiveResponse`<`number`\>

#### Implementation of

DatabaseInterface.reactiveUnsettled

___

### reactiveUnsettledAsync

▸ **reactiveUnsettledAsync**(`config`): `Promise`<`ReactiveResponseAsync`<`number`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfig` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`number`\>\>

#### Implementation of

DatabaseInterface.reactiveUnsettledAsync

___

### reactiveUnsettledAttached

▸ **reactiveUnsettledAttached**(`config`): `ReactiveResponse`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfigAttached` |

#### Returns

`ReactiveResponse`<`number`\>

#### Implementation of

DatabaseInterface.reactiveUnsettledAttached

___

### reactiveUnsettledAttachedAsync

▸ **reactiveUnsettledAttachedAsync**(`config`): `Promise`<`ReactiveResponseAsync`<`number`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ReactiveConfigAttached` |

#### Returns

`Promise`<`ReactiveResponseAsync`<`number`\>\>

#### Implementation of

DatabaseInterface.reactiveUnsettledAttachedAsync

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

▸ **unsettled**(`conditions?`, `options?`): `Promise`<`number`\>

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

▸ **unsettledAttached**(`conditions?`, `parentConditions?`, `options?`): `Promise`<`number`\>

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
