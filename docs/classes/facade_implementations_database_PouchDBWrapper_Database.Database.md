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

- [bulkDocs](facade_implementations_database_PouchDBWrapper_Database.Database.md#bulkdocs)
- [bulkDocsAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#bulkdocsattached)
- [count](facade_implementations_database_PouchDBWrapper_Database.Database.md#count)
- [countAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#countattached)
- [exists](facade_implementations_database_PouchDBWrapper_Database.Database.md#exists)
- [existsAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#existsattached)
- [get](facade_implementations_database_PouchDBWrapper_Database.Database.md#get)
- [getAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#getattached)
- [getDb](facade_implementations_database_PouchDBWrapper_Database.Database.md#getdb)
- [getIfExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#getifexists)
- [getIfExistsAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#getifexistsattached)
- [getRawDb](facade_implementations_database_PouchDBWrapper_Database.Database.md#getrawdb)
- [mapReduce](facade_implementations_database_PouchDBWrapper_Database.Database.md#mapreduce)
- [mapReduceAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#mapreduceattached)
- [migrate](facade_implementations_database_PouchDBWrapper_Database.Database.md#migrate)
- [put](facade_implementations_database_PouchDBWrapper_Database.Database.md#put)
- [putAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#putattached)
- [putAttachedBulk](facade_implementations_database_PouchDBWrapper_Database.Database.md#putattachedbulk)
- [putIfNotExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#putifnotexists)
- [putIfNotExistsAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#putifnotexistsattached)
- [query](facade_implementations_database_PouchDBWrapper_Database.Database.md#query)
- [queryAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#queryattached)
- [rawQuery](facade_implementations_database_PouchDBWrapper_Database.Database.md#rawquery)
- [reactiveCount](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivecount)
- [reactiveCountAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivecountattached)
- [reactiveExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveexists)
- [reactiveExistsAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveexistsattached)
- [reactiveFactoryGet](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactoryget)
- [reactiveFactoryGetAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactorygetasync)
- [reactiveFactoryGetAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactorygetattached)
- [reactiveFactoryGetAttachedAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactorygetattachedasync)
- [reactiveFactoryQuery](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactoryquery)
- [reactiveFactoryQueryAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactoryqueryasync)
- [reactiveFactoryQueryAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactoryqueryattached)
- [reactiveFactoryQueryAttachedAsync](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivefactoryqueryattachedasync)
- [reactiveGet](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveget)
- [reactiveGetAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivegetattached)
- [reactiveGetIfExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivegetifexists)
- [reactiveGetIfExistsAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivegetifexistsattached)
- [reactiveHandlerExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlerexists)
- [reactiveHandlerExistsAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlerexistsattached)
- [reactiveHandlerGet](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlerget)
- [reactiveHandlerGetAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlergetattached)
- [reactiveHandlerGetAttachedIfExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlergetattachedifexists)
- [reactiveHandlerGetIfExists](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivehandlergetifexists)
- [reactiveQuery](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivequery)
- [reactiveQueryAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactivequeryattached)
- [reactiveUnsettled](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveunsettled)
- [reactiveUnsettledAttached](facade_implementations_database_PouchDBWrapper_Database.Database.md#reactiveunsettledattached)
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
| `pouchConfig` | `DatabaseConfiguration` | PouchDB configuration. |

## Properties

### changes

• `Protected` **changes**: `undefined` \| [`Changes`](../interfaces/facade_implementations_database_PouchDBWrapper_PouchDBProxy.Changes.md) = `undefined`

___

### changesHandlersAttachedPool

• `Protected` `Readonly` **changesHandlersAttachedPool**: `Map`<\`attached-subscription-id-${string}\`, `AttachedChangesHandler`\>

___

### changesHandlersPool

• `Protected` `Readonly` **changesHandlersPool**: `Map`<\`subscription-id-${string}\`, `ChangesHandler`\>

___

### config

• `Protected` `Readonly` **config**: `Required`<[`Configuration`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.Configuration.md)\>

___

### db

• `Protected` **db**: `undefined` \| [`PouchDBProxy`](facade_implementations_database_PouchDBWrapper_PouchDBProxy.PouchDBProxy.md) = `undefined`

___

### name

• `Protected` `Readonly` **name**: `string`

___

### options

• `Protected` `Readonly` **options**: `Required`<`DatabaseOptions`\>

___

### pouchConfig

• `Protected` `Readonly` **pouchConfig**: `DatabaseConfiguration`

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

database.Database.bulkDocs

___

### bulkDocsAttached

▸ **bulkDocsAttached**(`docs`): `Promise`<`PutAttachedResponses`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `docs` | `BulkAttachedDocuments` |

#### Returns

`Promise`<`PutAttachedResponses`\>

#### Implementation of

database.Database.bulkDocsAttached

___

### count

▸ **count**(`conditions?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Conditions`<`string`\> |

#### Returns

`Promise`<`number`\>

#### Implementation of

database.Database.count

___

### countAttached

▸ **countAttached**(`conditions?`, `parentConditions?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Conditions`<`string`\> |
| `parentConditions` | `Conditions`<`string`\> |

#### Returns

`Promise`<`number`\>

#### Implementation of

database.Database.countAttached

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

database.Database.exists

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

database.Database.existsAttached

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

database.Database.get

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

database.Database.getAttached

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

database.Database.getIfExists

___

### getIfExistsAttached

▸ **getIfExistsAttached**(`id`, `parentId`): `Promise`<`undefined` \| `ExistingAttachedDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`Promise`<`undefined` \| `ExistingAttachedDocument`\>

#### Implementation of

database.Database.getIfExistsAttached

___

### getRawDb

▸ **getRawDb**(): `Promise`<[`PouchDatabase`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabase)\>

Returns original PouchDB database.

#### Returns

`Promise`<[`PouchDatabase`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabase)\>

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

database.Database.put

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

database.Database.putAttached

___

### putAttachedBulk

▸ **putAttachedBulk**(`parentId`, `docs`): `Promise`<`PutAttachedResponses`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentId` | `string` |
| `docs` | `PutAttachedDocuments` |

#### Returns

`Promise`<`PutAttachedResponses`\>

#### Implementation of

database.Database.putAttachedBulk

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

database.Database.putIfNotExists

___

### putIfNotExistsAttached

▸ **putIfNotExistsAttached**(`parentId`, `doc`): `Promise`<`undefined` \| `PutAttachedResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentId` | `string` |
| `doc` | `PutAttachedDocument` |

#### Returns

`Promise`<`undefined` \| `PutAttachedResponse`\>

#### Implementation of

database.Database.putIfNotExistsAttached

___

### query

▸ **query**(`conditions?`, `options?`): `Promise`<`ExistingDocuments`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Conditions`<`string`\> |
| `options` | `QueryOptions` |

#### Returns

`Promise`<`ExistingDocuments`\>

#### Implementation of

database.Database.query

___

### queryAttached

▸ **queryAttached**(`conditions?`, `parentConditions?`, `options?`): `Promise`<`ExistingAttachedDocuments`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Conditions`<`string`\> |
| `parentConditions` | `Conditions`<`string`\> |
| `options` | `QueryOptions` |

#### Returns

`Promise`<`ExistingAttachedDocuments`\>

#### Implementation of

database.Database.queryAttached

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

database.Database.reactiveCount

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

database.Database.reactiveCountAttached

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

database.Database.reactiveExists

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

database.Database.reactiveExistsAttached

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

▸ `Protected` **reactiveFactoryGetAsync**<`T`\>(`request`, `handler`, `result`): `Promise`<`ReactiveResponseLoaded`<`T`\>\>

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
| `result` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

#### Returns

`Promise`<`ReactiveResponseLoaded`<`T`\>\>

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

▸ `Protected` **reactiveFactoryGetAttachedAsync**<`T`\>(`request`, `handler`, `result`): `Promise`<`ReactiveResponseLoaded`<`T`\>\>

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
| `result` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

#### Returns

`Promise`<`ReactiveResponseLoaded`<`T`\>\>

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

▸ `Protected` **reactiveFactoryQueryAsync**<`T`\>(`request`, `config`, `result`): `Promise`<`ReactiveResponseLoaded`<`T`\>\>

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
| `result` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

#### Returns

`Promise`<`ReactiveResponseLoaded`<`T`\>\>

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

▸ `Protected` **reactiveFactoryQueryAttachedAsync**<`T`\>(`request`, `config`, `result`): `Promise`<`ReactiveResponseLoaded`<`T`\>\>

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
| `result` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

#### Returns

`Promise`<`ReactiveResponseLoaded`<`T`\>\>

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

database.Database.reactiveGet

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

database.Database.reactiveGetAttached

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

database.Database.reactiveGetIfExists

___

### reactiveGetIfExistsAttached

▸ **reactiveGetIfExistsAttached**(`id`, `parentId`): `ReactiveResponse`<`undefined` \| `ExistingAttachedDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `parentId` | `string` |

#### Returns

`ReactiveResponse`<`undefined` \| `ExistingAttachedDocument`\>

#### Implementation of

database.Database.reactiveGetIfExistsAttached

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

database.Database.reactiveQuery

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

database.Database.reactiveQueryAttached

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

database.Database.reactiveUnsettled

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

database.Database.reactiveUnsettledAttached

___

### refreshSubscription

▸ `Protected` **refreshSubscription**(): `void`

Refreshes subscriptions.

#### Returns

`void`

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

database.Database.reset

___

### subscribe

▸ **subscribe**(`handler`): \`subscription-id-${string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `ChangesHandler` |

#### Returns

\`subscription-id-${string}\`

#### Implementation of

database.Database.subscribe

___

### subscribeAttached

▸ **subscribeAttached**(`handler`): \`attached-subscription-id-${string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `AttachedChangesHandler` |

#### Returns

\`attached-subscription-id-${string}\`

#### Implementation of

database.Database.subscribeAttached

___

### unsettled

▸ **unsettled**(`conditions?`, `options?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Conditions`<`string`\> |
| `options` | `QueryOptions` |

#### Returns

`Promise`<`number`\>

#### Implementation of

database.Database.unsettled

___

### unsettledAttached

▸ **unsettledAttached**(`conditions?`, `parentConditions?`, `options?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | `Conditions`<`string`\> |
| `parentConditions` | `Conditions`<`string`\> |
| `options` | `QueryOptions` |

#### Returns

`Promise`<`number`\>

#### Implementation of

database.Database.unsettledAttached

___

### unsubscribe

▸ **unsubscribe**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | \`subscription-id-${string}\` |

#### Returns

`void`

#### Implementation of

database.Database.unsubscribe

___

### unsubscribeAttached

▸ **unsubscribeAttached**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | \`attached-subscription-id-${string}\` |

#### Returns

`void`

#### Implementation of

database.Database.unsubscribeAttached
