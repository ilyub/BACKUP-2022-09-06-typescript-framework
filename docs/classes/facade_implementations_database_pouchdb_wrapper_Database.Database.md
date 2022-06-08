[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/Database](../modules/facade_implementations_database_pouchdb_wrapper_Database.md) / Database

# Class: Database

[facade-implementations/database/pouchdb-wrapper/Database](../modules/facade_implementations_database_pouchdb_wrapper_Database.md).Database

## Implements

- `Database`

## Table of contents

### Constructors

- [constructor](facade_implementations_database_pouchdb_wrapper_Database.Database.md#constructor)

### Properties

- [changes](facade_implementations_database_pouchdb_wrapper_Database.Database.md#changes)
- [changesHandlers](facade_implementations_database_pouchdb_wrapper_Database.Database.md#changeshandlers)
- [changesHandlersAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#changeshandlersattached)
- [config](facade_implementations_database_pouchdb_wrapper_Database.Database.md#config)
- [db](facade_implementations_database_pouchdb_wrapper_Database.Database.md#db)
- [name](facade_implementations_database_pouchdb_wrapper_Database.Database.md#name)
- [options](facade_implementations_database_pouchdb_wrapper_Database.Database.md#options)
- [pouchConfig](facade_implementations_database_pouchdb_wrapper_Database.Database.md#pouchconfig)

### Methods

- [\_putAttachedBulk](facade_implementations_database_pouchdb_wrapper_Database.Database.md#_putattachedbulk)
- [\_rawQuery](facade_implementations_database_pouchdb_wrapper_Database.Database.md#_rawquery)
- [\_rebuildIndex](facade_implementations_database_pouchdb_wrapper_Database.Database.md#_rebuildindex)
- [bulkDocs](facade_implementations_database_pouchdb_wrapper_Database.Database.md#bulkdocs)
- [bulkDocsAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#bulkdocsattached)
- [count](facade_implementations_database_pouchdb_wrapper_Database.Database.md#count)
- [countAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#countattached)
- [createDesignDocument](facade_implementations_database_pouchdb_wrapper_Database.Database.md#createdesigndocument)
- [createReactiveStorage](facade_implementations_database_pouchdb_wrapper_Database.Database.md#createreactivestorage)
- [exists](facade_implementations_database_pouchdb_wrapper_Database.Database.md#exists)
- [existsAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#existsattached)
- [get](facade_implementations_database_pouchdb_wrapper_Database.Database.md#get)
- [getAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#getattached)
- [getDb](facade_implementations_database_pouchdb_wrapper_Database.Database.md#getdb)
- [getIfExists](facade_implementations_database_pouchdb_wrapper_Database.Database.md#getifexists)
- [getIfExistsAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#getifexistsattached)
- [getRawDb](facade_implementations_database_pouchdb_wrapper_Database.Database.md#getrawdb)
- [migrate](facade_implementations_database_pouchdb_wrapper_Database.Database.md#migrate)
- [put](facade_implementations_database_pouchdb_wrapper_Database.Database.md#put)
- [putAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#putattached)
- [putAttachedBulk](facade_implementations_database_pouchdb_wrapper_Database.Database.md#putattachedbulk)
- [putIfNotExists](facade_implementations_database_pouchdb_wrapper_Database.Database.md#putifnotexists)
- [putIfNotExistsAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#putifnotexistsattached)
- [query](facade_implementations_database_pouchdb_wrapper_Database.Database.md#query)
- [queryAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#queryattached)
- [rawQuery](facade_implementations_database_pouchdb_wrapper_Database.Database.md#rawquery)
- [reactiveCount](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivecount)
- [reactiveCountAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivecountattached)
- [reactiveExists](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactiveexists)
- [reactiveExistsAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactiveexistsattached)
- [reactiveFactoryGet](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivefactoryget)
- [reactiveFactoryGetAsync](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivefactorygetasync)
- [reactiveFactoryGetAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivefactorygetattached)
- [reactiveFactoryGetAttachedAsync](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivefactorygetattachedasync)
- [reactiveFactoryQuery](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivefactoryquery)
- [reactiveFactoryQueryAsync](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivefactoryqueryasync)
- [reactiveFactoryQueryAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivefactoryqueryattached)
- [reactiveFactoryQueryAttachedAsync](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivefactoryqueryattachedasync)
- [reactiveGet](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactiveget)
- [reactiveGetAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivegetattached)
- [reactiveGetIfExists](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivegetifexists)
- [reactiveGetIfExistsAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivegetifexistsattached)
- [reactiveQuery](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivequery)
- [reactiveQueryAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactivequeryattached)
- [reactiveUnsettled](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactiveunsettled)
- [reactiveUnsettledAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reactiveunsettledattached)
- [rebuildIndex](facade_implementations_database_pouchdb_wrapper_Database.Database.md#rebuildindex)
- [refreshSubscription](facade_implementations_database_pouchdb_wrapper_Database.Database.md#refreshsubscription)
- [reset](facade_implementations_database_pouchdb_wrapper_Database.Database.md#reset)
- [subscribe](facade_implementations_database_pouchdb_wrapper_Database.Database.md#subscribe)
- [subscribeAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#subscribeattached)
- [unsettled](facade_implementations_database_pouchdb_wrapper_Database.Database.md#unsettled)
- [unsettledAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#unsettledattached)
- [unsubscribe](facade_implementations_database_pouchdb_wrapper_Database.Database.md#unsubscribe)
- [unsubscribeAttached](facade_implementations_database_pouchdb_wrapper_Database.Database.md#unsubscribeattached)

## Constructors

### constructor

• **new Database**(`name`, `options?`, `config?`, `pouchConfig?`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Database name. |
| `options` | `DatabaseOptions` | Database options. |
| `config` | [`Configuration`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.Configuration.md) | Configuration. |
| `pouchConfig` | `DatabaseConfiguration` | PouchDB configuration. |

## Properties

### changes

• `Protected` **changes**: `undefined` \| [`PouchChanges`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

___

### changesHandlers

• `Protected` `Readonly` **changesHandlers**: `Map`<\`subscription-id-${string}\`, `ChangesHandler`\>

___

### changesHandlersAttached

• `Protected` `Readonly` **changesHandlersAttached**: `Map`<\`attached-subscription-id-${string}\`, `AttachedChangesHandler`\>

___

### config

• `Protected` `Readonly` **config**: `Required`<[`Configuration`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.Configuration.md)\>

___

### db

• `Protected` **db**: `undefined` \| [`PouchProxy`](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md)

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

### \_putAttachedBulk

▸ `Protected` **_putAttachedBulk**(`parentId`, `docs`): `Promise`<`undefined` \| `PutAttachedResponses`\>

Puts attached documents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentId` | `string` | Parent ID. |
| `docs` | `PutAttachedDocuments` | Attached documents. |

#### Returns

`Promise`<`undefined` \| `PutAttachedResponses`\>

Responses.

___

### \_rawQuery

▸ `Protected` **_rawQuery**(`mapReduce`, `options`, `queryOptions`): `Promise`<[`RawQueryResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.RawQueryResponse.md)\>

Queries database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapReduce` | [`MapReduce`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.MapReduce.md) | Map/reduce function. |
| `options` | `QueryOptions` | Options. |
| `queryOptions` | [`RawQueryOptions`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.RawQueryOptions.md) \| [`RawQueryOptionsAttached`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.RawQueryOptionsAttached.md) | Query options. |

#### Returns

`Promise`<[`RawQueryResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.RawQueryResponse.md)\>

Documents.

___

### \_rebuildIndex

▸ `Protected` **_rebuildIndex**(`mapReduce`): `Promise`<`boolean`\>

Rebuilds index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapReduce` | [`MapReduce`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.MapReduce.md) | Map/reduce function. |

#### Returns

`Promise`<`boolean`\>

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

### createDesignDocument

▸ `Protected` **createDesignDocument**(`mapReduce`): `Promise`<`void`\>

Creates design document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapReduce` | [`MapReduce`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.MapReduce.md) | Map/reduce function. |

#### Returns

`Promise`<`void`\>

___

### createReactiveStorage

▸ `Protected` `Readonly` **createReactiveStorage**<`T`\>(): `ReactiveResponse`<`T`\>

Creates reactive storage.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`ReactiveResponse`<`T`\>

Reactive storage.

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

▸ `Protected` **getDb**(): `Promise`<[`PouchProxy`](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md)\>

Returns PouchProxy instance.

#### Returns

`Promise`<[`PouchProxy`](facade_implementations_database_pouchdb_wrapper_PouchProxy.PouchProxy.md)\>

PouchProxy instance.

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

▸ **getRawDb**(): `Promise`<[`PouchDatabase`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)\>

Returns original PouchDB database.

#### Returns

`Promise`<[`PouchDatabase`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)\>

Original PouchDB database.

___

### migrate

▸ `Protected` **migrate**(): `Promise`<`void`\>

Applies migrations.

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

▸ `Protected` **rawQuery**(`options`, `queryOptions`): `Promise`<[`RawQueryResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.RawQueryResponse.md)\>

Queries database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `QueryOptions` | Options. |
| `queryOptions` | [`RawQueryOptions`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.RawQueryOptions.md) \| [`RawQueryOptionsAttached`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.RawQueryOptionsAttached.md) | Query options. |

#### Returns

`Promise`<[`RawQueryResponse`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.RawQueryResponse.md)\>

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
| `handler` | [`ReactiveHandler`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.ReactiveHandler.md)<`T`\> | Handler. |

#### Returns

`ReactiveResponse`<`T`\>

Reactive response.

___

### reactiveFactoryGetAsync

▸ `Protected` **reactiveFactoryGetAsync**<`T`\>(`request`, `handler`, `mutableResult`): `Promise`<`ReactiveResponseLoaded`<`T`\>\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Promise`<`T`\> | Request. |
| `handler` | [`ReactiveHandler`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.ReactiveHandler.md)<`T`\> | Handler. |
| `mutableResult` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

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
| `handler` | [`ReactiveHandlerAttached`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.ReactiveHandlerAttached.md)<`T`\> | Handler. |

#### Returns

`ReactiveResponse`<`T`\>

Reactive response.

___

### reactiveFactoryGetAttachedAsync

▸ `Protected` **reactiveFactoryGetAttachedAsync**<`T`\>(`request`, `handler`, `mutableResult`): `Promise`<`ReactiveResponseLoaded`<`T`\>\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Promise`<`T`\> | Request. |
| `handler` | [`ReactiveHandlerAttached`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.ReactiveHandlerAttached.md)<`T`\> | Handler. |
| `mutableResult` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

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
| `request` | [`ReactiveRequest`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.ReactiveRequest.md)<`T`\> | Request. |
| `config` | `ReactiveConfig` | Configuration. |

#### Returns

`ReactiveResponse`<`T`\>

Reactive response.

___

### reactiveFactoryQueryAsync

▸ `Protected` **reactiveFactoryQueryAsync**<`T`\>(`request`, `config`, `mutableResult`): `Promise`<`ReactiveResponseLoaded`<`T`\>\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`ReactiveRequest`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.ReactiveRequest.md)<`T`\> | Request. |
| `config` | `ReactiveConfig` | Configuration. |
| `mutableResult` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

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
| `request` | [`ReactiveRequestAttached`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.ReactiveRequestAttached.md)<`T`\> | Request. |
| `config` | `ReactiveConfigAttached` | Configuration. |

#### Returns

`ReactiveResponse`<`T`\>

Reactive response.

___

### reactiveFactoryQueryAttachedAsync

▸ `Protected` **reactiveFactoryQueryAttachedAsync**<`T`\>(`request`, `config`, `mutableResult`): `Promise`<`ReactiveResponseLoaded`<`T`\>\>

Reactive factory.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`ReactiveRequestAttached`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.ReactiveRequestAttached.md)<`T`\> | Request. |
| `config` | `ReactiveConfigAttached` | Configuration. |
| `mutableResult` | `Writable`<`ReactiveResponse`<`T`\>\> | Reactive result. |

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

### rebuildIndex

▸ `Protected` **rebuildIndex**(`mapReduce`): `Promise`<`void`\>

Rebuilds index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapReduce` | [`MapReduce`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.MapReduce.md) | Map/reduce function. |

#### Returns

`Promise`<`void`\>

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
