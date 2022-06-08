[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md) / PouchDatabase

# Interface: PouchDatabase

[facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md).PouchDatabase

## Hierarchy

- `Database`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>

  ↳ **`PouchDatabase`**

## Table of contents

### Properties

- [name](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#name)
- [replicate](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#replicate)

### Methods

- [addListener](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#addlistener)
- [allDocs](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#alldocs)
- [bulkDocs](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#bulkdocs)
- [bulkGet](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#bulkget)
- [changes](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#changes)
- [close](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#close)
- [compact](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#compact)
- [createIndex](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#createindex)
- [deleteIndex](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#deleteindex)
- [destroy](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#destroy)
- [emit](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#emit)
- [eventNames](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#eventnames)
- [find](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#find)
- [get](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#get)
- [getAttachment](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#getattachment)
- [getIndexes](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#getindexes)
- [getMaxListeners](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#getmaxlisteners)
- [info](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#info)
- [listenerCount](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#listenercount)
- [listeners](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#listeners)
- [on](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#on)
- [once](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#once)
- [post](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#post)
- [prependListener](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#prependlistener)
- [prependOnceListener](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#prependoncelistener)
- [put](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#put)
- [putAttachment](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#putattachment)
- [query](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#query)
- [remove](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#remove)
- [removeAllListeners](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#removealllisteners)
- [removeAttachment](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#removeattachment)
- [removeListener](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#removelistener)
- [revsDiff](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#revsdiff)
- [setMaxListeners](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#setmaxlisteners)
- [sync](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#sync)
- [viewCleanup](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md#viewcleanup)

## Properties

### name

• **name**: `string`

The name passed to the PouchDB constructor and unique identifier of the database.

#### Inherited from

PouchDB.Database.name

___

### replicate

• **replicate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from` | <Content\>(`source`: `string` \| `Database`<`Content`\>, `options?`: `ReplicateOptions`, `callback?`: `Callback`<`ReplicationResultComplete`<`Content`\>\>) => `Replication`<`Content`\> |
| `to` | <Content\>(`target`: `string` \| `Database`<`Content`\>, `options?`: `ReplicateOptions`, `callback?`: `Callback`<`ReplicationResultComplete`<`Content`\>\>) => `Replication`<`Content`\> |

#### Inherited from

PouchDB.Database.replicate

## Methods

### addListener

▸ **addListener**(`event`, `listener`): [`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Inherited from

PouchDB.Database.addListener

___

### allDocs

▸ **allDocs**<`Model`\>(`options?`): `Promise`<`AllDocsResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>\>

Fetch all documents matching the given options.

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `AllDocsWithKeyOptions` \| `AllDocsOptions` \| `AllDocsWithKeysOptions` \| `AllDocsWithinRangeOptions` |

#### Returns

`Promise`<`AllDocsResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>\>

#### Inherited from

PouchDB.Database.allDocs

___

### bulkDocs

▸ **bulkDocs**<`Model`\>(`docs`, `options`, `callback`): `void`

Create, update or delete multiple documents. The docs argument is an array of documents.
If you omit an _id parameter on a given document, the database will create a new document and assign the ID for you.
To update a document, you must include both an _id parameter and a _rev parameter,
which should match the ID and revision of the document on which to base your updates.
Finally, to delete a document, include a _deleted parameter with the value true.

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `docs` | `PutDocument`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>[] |
| `options` | ``null`` \| `BulkDocsOptions` |
| `callback` | `Callback`<(`Error` \| `Response`)[]\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.bulkDocs

▸ **bulkDocs**<`Model`\>(`docs`, `options?`): `Promise`<(`Error` \| `Response`)[]\>

Create, update or delete multiple documents. The docs argument is an array of documents.
If you omit an _id parameter on a given document, the database will create a new document and assign the ID for you.
To update a document, you must include both an _id parameter and a _rev parameter,
which should match the ID and revision of the document on which to base your updates.
Finally, to delete a document, include a _deleted parameter with the value true.

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `docs` | `PutDocument`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>[] |
| `options?` | `BulkDocsOptions` |

#### Returns

`Promise`<(`Error` \| `Response`)[]\>

#### Inherited from

PouchDB.Database.bulkDocs

___

### bulkGet

▸ **bulkGet**<`Model`\>(`options`, `callback`): `void`

Given a set of document/revision IDs, returns the document bodies (and, optionally, attachment data) for each ID/revision pair specified.

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `BulkGetOptions` |
| `callback` | `Callback`<`BulkGetResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.bulkGet

▸ **bulkGet**<`Model`\>(`options`): `Promise`<`BulkGetResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>\>

Given a set of document/revision IDs, returns the document bodies (and, optionally, attachment data) for each ID/revision pair specified.

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `BulkGetOptions` |

#### Returns

`Promise`<`BulkGetResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>\>

#### Inherited from

PouchDB.Database.bulkGet

___

### changes

▸ **changes**<`Model`\>(`options`, `callback`): `void`

A list of changes made to documents in the database, in the order they were made.
It returns an object with the method cancel(), which you call if you don’t want to listen to new changes anymore.

It is an event emitter and will emit a 'change' event on each document change,
a 'complete' event when all the changes have been processed, and an 'error' event when an error occurs.
Calling cancel() will unsubscribe all event listeners automatically.

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | ``null`` \| `ChangesOptions` |
| `callback` | `Callback`<`Changes`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.changes

▸ **changes**<`Model`\>(`options?`): `Changes`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>

A list of changes made to documents in the database, in the order they were made.
It returns an object with the method cancel(), which you call if you don’t want to listen to new changes anymore.

It is an event emitter and will emit a 'change' event on each document change,
a 'complete' event when all the changes have been processed, and an 'error' event when an error occurs.
Calling cancel() will unsubscribe all event listeners automatically.

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ChangesOptions` |

#### Returns

`Changes`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>

#### Inherited from

PouchDB.Database.changes

___

### close

▸ **close**(`callback`): `void`

Close the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Callback`<`any`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.close

▸ **close**(): `Promise`<`void`\>

Close the database

#### Returns

`Promise`<`void`\>

#### Inherited from

PouchDB.Database.close

___

### compact

▸ **compact**(`options?`): `Promise`<`Response`\>

Compact the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `CompactOptions` |

#### Returns

`Promise`<`Response`\>

#### Inherited from

PouchDB.Database.compact

▸ **compact**(`options`, `callback`): `void`

Compact the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `CompactOptions` |
| `callback` | `Callback`<`Response`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.compact

___

### createIndex

▸ **createIndex**(`index`, `callback`): `void`

Create an index if it doesn't exist, or do nothing if it already exists.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `CreateIndexOptions` |
| `callback` | `Callback`<`CreateIndexResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.createIndex

▸ **createIndex**(`index?`): `Promise`<`CreateIndexResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index?` | `CreateIndexOptions` |

#### Returns

`Promise`<`CreateIndexResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\>

#### Inherited from

PouchDB.Database.createIndex

___

### deleteIndex

▸ **deleteIndex**(`index`, `callback`): `void`

Delete an index and clean up any leftover data on the disk.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `DeleteIndexOptions` |
| `callback` | `Callback`<`DeleteIndexResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.deleteIndex

▸ **deleteIndex**(`index?`): `Promise`<`DeleteIndexResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index?` | `DeleteIndexOptions` |

#### Returns

`Promise`<`DeleteIndexResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\>

#### Inherited from

PouchDB.Database.deleteIndex

___

### destroy

▸ **destroy**(`options`, `callback`): `void`

Destroy the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | ``null`` \| `Options` |
| `callback` | `Callback`<`any`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.destroy

▸ **destroy**(`options?`): `Promise`<`void`\>

Destroy the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | ``null`` \| `Options` |

#### Returns

`Promise`<`void`\>

#### Inherited from

PouchDB.Database.destroy

___

### emit

▸ **emit**(`event`, ...`args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

PouchDB.Database.emit

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

PouchDB.Database.eventNames

___

### find

▸ **find**(`request`, `callback`): `void`

Query the API to find some documents.

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `FindRequest`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\> |
| `callback` | `Callback`<`FindResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.find

▸ **find**(`request?`): `Promise`<`FindResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request?` | `FindRequest`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\> |

#### Returns

`Promise`<`FindResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\>

#### Inherited from

PouchDB.Database.find

___

### get

▸ **get**<`Model`\>(`docId`, `options`, `callback`): `void`

Fetch a document

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `options` | ``null`` \| `GetOptions` |
| `callback` | `Callback`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model` & `IdMeta` & `GetMeta`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.get

▸ **get**<`Model`\>(`docId`, `options`, `callback`): `void`

Fetch a document

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `options` | `GetOpenRevisions` |
| `callback` | `Callback`<`Revision`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>[]\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.get

▸ **get**<`Model`\>(`docId`, `options?`): `Promise`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model` & `IdMeta` & `GetMeta`\>

Fetch a document

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `options?` | `GetOptions` |

#### Returns

`Promise`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model` & `IdMeta` & `GetMeta`\>

#### Inherited from

PouchDB.Database.get

▸ **get**<`Model`\>(`docId`, `options`): `Promise`<`Revision`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>[]\>

Fetch a document

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `options` | `GetOpenRevisions` |

#### Returns

`Promise`<`Revision`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\>[]\>

#### Inherited from

PouchDB.Database.get

___

### getAttachment

▸ **getAttachment**(`docId`, `attachmentId`, `options`, `callback`): `void`

Get attachment data

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `attachmentId` | `string` |
| `options` | `Object` |
| `options.rev?` | `string` |
| `callback` | `Callback`<`Buffer` \| `Blob`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.getAttachment

▸ **getAttachment**(`docId`, `attachmentId`, `options?`): `Promise`<`Buffer` \| `Blob`\>

Get attachment data

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `attachmentId` | `string` |
| `options?` | `Object` |
| `options.rev?` | `string` |

#### Returns

`Promise`<`Buffer` \| `Blob`\>

#### Inherited from

PouchDB.Database.getAttachment

▸ **getAttachment**(`docId`, `attachmentId`, `callback`): `void`

Get attachment data

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `attachmentId` | `string` |
| `callback` | `Callback`<`Buffer` \| `Blob`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.getAttachment

___

### getIndexes

▸ **getIndexes**(`callback`): `void`

Get a list of all the indexes you've created. Also tells you about the special _all_docs index, i.e. the default index on the _id field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Callback`<`GetIndexesResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.getIndexes

▸ **getIndexes**(): `Promise`<`GetIndexesResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\>

#### Returns

`Promise`<`GetIndexesResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\>

#### Inherited from

PouchDB.Database.getIndexes

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

PouchDB.Database.getMaxListeners

___

### info

▸ **info**(`callback`): `void`

Get database information

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Callback`<`DatabaseInfo`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.info

▸ **info**(): `Promise`<`DatabaseInfo`\>

Get database information

#### Returns

`Promise`<`DatabaseInfo`\>

#### Inherited from

PouchDB.Database.info

___

### listenerCount

▸ **listenerCount**(`type`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` \| `symbol` |

#### Returns

`number`

#### Inherited from

PouchDB.Database.listenerCount

___

### listeners

▸ **listeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

PouchDB.Database.listeners

___

### on

▸ **on**(`event`, `listener`): [`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Inherited from

PouchDB.Database.on

___

### once

▸ **once**(`event`, `listener`): [`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Inherited from

PouchDB.Database.once

___

### post

▸ **post**<`Model`\>(`doc`, `options`, `callback`): `void`

Create a new document without providing an id.

You should prefer put() to post(), because when you post(), you are
missing an opportunity to use allDocs() to sort documents by _id
(because your _ids are random).

**`see`** [PouchDB Pro Tips](https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html)

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `PostDocument`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\> |
| `options` | ``null`` \| `Options` |
| `callback` | `Callback`<`Response`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.post

▸ **post**<`Model`\>(`doc`, `options?`): `Promise`<`Response`\>

Create a new document without providing an id.

You should prefer put() to post(), because when you post(), you are
missing an opportunity to use allDocs() to sort documents by _id
(because your _ids are random).

**`see`** [PouchDB Pro Tips](https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html)

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `PostDocument`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\> |
| `options?` | `Options` |

#### Returns

`Promise`<`Response`\>

#### Inherited from

PouchDB.Database.post

___

### prependListener

▸ **prependListener**(`event`, `listener`): [`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Inherited from

PouchDB.Database.prependListener

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Inherited from

PouchDB.Database.prependOnceListener

___

### put

▸ **put**<`Model`\>(`doc`, `options`, `callback`): `void`

Create a new document or update an existing document.

If the document already exists, you must specify its revision _rev,
otherwise a conflict will occur.
There are some restrictions on valid property names of the documents.
If you try to store non-JSON data (for instance Date objects) you may
see inconsistent results.

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `PutDocument`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\> |
| `options` | ``null`` \| `PutOptions` |
| `callback` | `Callback`<`Response`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.put

▸ **put**<`Model`\>(`doc`, `options?`): `Promise`<`Response`\>

Create a new document or update an existing document.

If the document already exists, you must specify its revision _rev,
otherwise a conflict will occur.
There are some restrictions on valid property names of the documents.
If you try to store non-JSON data (for instance Date objects) you may
see inconsistent results.

#### Type parameters

| Name |
| :------ |
| `Model` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `PutDocument`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `Model`\> |
| `options?` | `PutOptions` |

#### Returns

`Promise`<`Response`\>

#### Inherited from

PouchDB.Database.put

___

### putAttachment

▸ **putAttachment**(`docId`, `attachmentId`, `rev`, `attachment`, `type`, `callback`): `void`

Attaches a binary object to a document.
This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
If the document doesn’t already exist, then this method will create an empty document containing the attachment.

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `attachmentId` | `string` |
| `rev` | `string` |
| `attachment` | `AttachmentData` |
| `type` | `string` |
| `callback` | `Callback`<`Response`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.putAttachment

▸ **putAttachment**(`docId`, `attachmentId`, `rev`, `attachment`, `type`): `Promise`<`Response`\>

Attaches a binary object to a document.
This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
If the document doesn’t already exist, then this method will create an empty document containing the attachment.

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `attachmentId` | `string` |
| `rev` | `string` |
| `attachment` | `AttachmentData` |
| `type` | `string` |

#### Returns

`Promise`<`Response`\>

#### Inherited from

PouchDB.Database.putAttachment

▸ **putAttachment**(`docId`, `attachmentId`, `attachment`, `type`, `callback`): `void`

Attaches a binary object to a document.
This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
If the document doesn’t already exist, then this method will create an empty document containing the attachment.

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `attachmentId` | `string` |
| `attachment` | `AttachmentData` |
| `type` | `string` |
| `callback` | `Callback`<`Response`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.putAttachment

▸ **putAttachment**(`docId`, `attachmentId`, `attachment`, `type`): `Promise`<`Response`\>

Attaches a binary object to a document.
This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
If the document doesn’t already exist, then this method will create an empty document containing the attachment.

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `attachmentId` | `string` |
| `attachment` | `AttachmentData` |
| `type` | `string` |

#### Returns

`Promise`<`Response`\>

#### Inherited from

PouchDB.Database.putAttachment

___

### query

▸ **query**<`Result`, `Model`\>(`fun`, `opts`, `callback`): `void`

Invoke a map/reduce function, which allows you to perform more complex queries
on PouchDB than what you get with allDocs().

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Result` | extends `Object` |
| `Model` | extends `Object` = [`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fun` | `string` \| `Map`<`Model`, `Result`\> \| `Filter`<`Model`, `Result`\> |
| `opts` | `Options`<`Model`, `Result`\> |
| `callback` | `Callback`<`Response`<`Result`\>\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.query

▸ **query**<`Result`, `Model`\>(`fun`, `callback`): `void`

Invoke a map/reduce function, which allows you to perform more complex queries
on PouchDB than what you get with allDocs().

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Result` | extends `Object` |
| `Model` | extends `Object` = [`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fun` | `string` \| `Map`<`Model`, `Result`\> \| `Filter`<`Model`, `Result`\> |
| `callback` | `Callback`<`Response`<`Result`\>\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.query

▸ **query**<`Result`, `Model`\>(`fun`, `opts?`): `Promise`<`Response`<`Result`\>\>

Invoke a map/reduce function, which allows you to perform more complex queries
on PouchDB than what you get with allDocs().

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Result` | extends `Object` |
| `Model` | extends `Object` = [`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fun` | `string` \| `Map`<`Model`, `Result`\> \| `Filter`<`Model`, `Result`\> |
| `opts?` | `Options`<`Model`, `Result`\> |

#### Returns

`Promise`<`Response`<`Result`\>\>

#### Inherited from

PouchDB.Database.query

___

### remove

▸ **remove**(`doc`, `options`, `callback`): `void`

Remove a doc from the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `RemoveDocument` |
| `options` | `Options` |
| `callback` | `Callback`<`Response`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.remove

▸ **remove**(`docId`, `revision`, `options`, `callback`): `void`

Remove a doc from the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `revision` | `string` |
| `options` | `Options` |
| `callback` | `Callback`<`Response`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.remove

▸ **remove**(`doc`, `options?`): `Promise`<`Response`\>

Remove a doc from the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `RemoveDocument` |
| `options?` | `Options` |

#### Returns

`Promise`<`Response`\>

#### Inherited from

PouchDB.Database.remove

▸ **remove**(`docId`, `revision`, `options?`): `Promise`<`Response`\>

Remove a doc from the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `revision` | `string` |
| `options?` | `Options` |

#### Returns

`Promise`<`Response`\>

#### Inherited from

PouchDB.Database.remove

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Inherited from

PouchDB.Database.removeAllListeners

___

### removeAttachment

▸ **removeAttachment**(`docId`, `attachmentId`, `rev`, `callback`): `void`

Delete an attachment from a doc. You must supply the rev of the existing doc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `attachmentId` | `string` |
| `rev` | `string` |
| `callback` | `Callback`<`RemoveAttachmentResponse`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.removeAttachment

▸ **removeAttachment**(`docId`, `attachmentId`, `rev`): `Promise`<`RemoveAttachmentResponse`\>

Delete an attachment from a doc. You must supply the rev of the existing doc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `docId` | `string` |
| `attachmentId` | `string` |
| `rev` | `string` |

#### Returns

`Promise`<`RemoveAttachmentResponse`\>

#### Inherited from

PouchDB.Database.removeAttachment

___

### removeListener

▸ **removeListener**(`event`, `listener`): [`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Inherited from

PouchDB.Database.removeListener

___

### revsDiff

▸ **revsDiff**(`diff`, `callback`): `void`

Given a set of document/revision IDs, returns the subset of those that do not correspond to revisions stored in the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `diff` | `RevisionDiffOptions` |
| `callback` | `Callback`<`RevisionDiffResponse`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.revsDiff

▸ **revsDiff**(`diff`): `Promise`<`RevisionDiffResponse`\>

Given a set of document/revision IDs, returns the subset of those that do not correspond to revisions stored in the database

#### Parameters

| Name | Type |
| :------ | :------ |
| `diff` | `RevisionDiffOptions` |

#### Returns

`Promise`<`RevisionDiffResponse`\>

#### Inherited from

PouchDB.Database.revsDiff

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`PouchDatabase`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchDatabase.md)

#### Inherited from

PouchDB.Database.setMaxListeners

___

### sync

▸ **sync**<`Content`\>(`remote`, `options?`, `callback?`): `Sync`<`Content`\>

Sync data from src to target and target to src. This is a convenience method for bidirectional data replication.

In other words, this code:
`PouchDB.replicate('mydb', 'http://localhost:5984/mydb')`;
`PouchDB.replicate('http://localhost:5984/mydb', 'mydb')`;
is equivalent to this code:
`PouchDB.sync('mydb', 'http://localhost:5984/mydb')`;

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Content` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `remote` | `string` \| `Database`<`Content`\> |
| `options?` | `SyncOptions` |
| `callback?` | `Callback`<`SyncResultComplete`<`Content`\>\> |

#### Returns

`Sync`<`Content`\>

#### Inherited from

PouchDB.Database.sync

___

### viewCleanup

▸ **viewCleanup**(`callback`): `void`

Cleans up any stale map/reduce indexes.

As design docs are deleted or modified, their associated index
files(in CouchDB) or companion databases (in local PouchDBs) continue
to take up space on disk. viewCleanup() removes these unnecessary
index files.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Callback`<`BasicResponse`\> |

#### Returns

`void`

#### Inherited from

PouchDB.Database.viewCleanup

▸ **viewCleanup**(): `Promise`<`BasicResponse`\>

Cleans up any stale map/reduce indexes.

As design docs are deleted or modified, their associated index
files(in CouchDB) or companion databases (in local PouchDBs) continue
to take up space on disk. viewCleanup() removes these unnecessary
index files.

#### Returns

`Promise`<`BasicResponse`\>

#### Inherited from

PouchDB.Database.viewCleanup
