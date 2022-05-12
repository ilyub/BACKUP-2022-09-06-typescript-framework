[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md) / PouchChangesOptions

# Interface: PouchChangesOptions

[facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md).PouchChangesOptions

## Hierarchy

- `ChangesOptions`

  ↳ **`PouchChangesOptions`**

## Table of contents

### Properties

- [attachments](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#attachments)
- [batch\_size](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#batch_size)
- [binary](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#binary)
- [conflicts](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#conflicts)
- [descending](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#descending)
- [doc\_ids](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#doc_ids)
- [filter](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#filter)
- [heartbeat](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#heartbeat)
- [include\_docs](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#include_docs)
- [limit](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#limit)
- [live](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#live)
- [query\_params](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#query_params)
- [return\_docs](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#return_docs)
- [selector](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#selector)
- [seq\_interval](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#seq_interval)
- [since](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#since)
- [style](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#style)
- [timeout](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#timeout)
- [view](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChangesOptions.md#view)

## Properties

### attachments

• `Optional` **attachments**: `boolean`

Include attachments.

#### Inherited from

PouchDB.Core.ChangesOptions.attachments

___

### batch\_size

• `Optional` **batch\_size**: `number`

Only available for http databases, this configures how many changes to fetch at a time.
Increasing this can reduce the number of requests made. Default is 25.

#### Inherited from

PouchDB.Core.ChangesOptions.batch\_size

___

### binary

• `Optional` **binary**: `boolean`

Return attachment data as Blobs/Buffers, instead of as base64-encoded strings.

#### Inherited from

PouchDB.Core.ChangesOptions.binary

___

### conflicts

• `Optional` **conflicts**: `boolean`

Include conflicts.

#### Inherited from

PouchDB.Core.ChangesOptions.conflicts

___

### descending

• `Optional` **descending**: `boolean`

Reverse the order of the output documents.

#### Inherited from

PouchDB.Core.ChangesOptions.descending

___

### doc\_ids

• `Optional` **doc\_ids**: `string`[]

Only show changes for docs with these ids (array of strings).

#### Inherited from

PouchDB.Core.ChangesOptions.doc\_ids

___

### filter

• `Optional` **filter**: `string` \| (`doc`: `any`, `params`: `any`) => `any`

Reference a filter function from a design document to selectively get updates.
To use a view function, pass '_view' here and provide a reference to the view function in options.view.
See filtered changes for details.

#### Inherited from

PouchDB.Core.ChangesOptions.filter

___

### heartbeat

• `Optional` **heartbeat**: `number` \| ``false``

For http adapter only, time in milliseconds for server to give a heartbeat to keep long connections open.
Defaults to 10000 (10 seconds), use false to disable the default.

#### Inherited from

PouchDB.Core.ChangesOptions.heartbeat

___

### include\_docs

• `Optional` **include\_docs**: `boolean`

Include contents for each document.

#### Inherited from

PouchDB.Core.ChangesOptions.include\_docs

___

### limit

• `Optional` **limit**: `number` \| ``false``

Maximum number of documents to return.

#### Inherited from

PouchDB.Core.ChangesOptions.limit

___

### live

• `Optional` **live**: `boolean`

Does "live" changes.

#### Inherited from

PouchDB.Core.ChangesOptions.live

___

### query\_params

• `Optional` **query\_params**: `Object`

Object containing properties that are passed to the filter function, e.g. {"foo:"bar"},
where "bar" will be available in the filter function as params.query.foo.
To access the params, define your filter function like function (doc, params).

#### Index signature

▪ [paramName: `string`]: `any`

#### Inherited from

PouchDB.Core.ChangesOptions.query\_params

___

### return\_docs

• `Optional` **return\_docs**: `boolean`

(previously options.returnDocs): Is available for non-http databases and defaults to true.
Passing false prevents the changes feed from keeping all the documents in memory – in other
words complete always has an empty results array, and the change event is the only way to get the event.
Useful for large change sets where otherwise you would run out of memory.

#### Inherited from

PouchDB.Core.ChangesOptions.return\_docs

___

### selector

• `Optional` **selector**: `Selector`

Filter using a query/pouchdb-find selector. Note: Selectors are not supported in CouchDB 1.x.
Cannot be used in combination with the filter option.

#### Inherited from

PouchDB.Core.ChangesOptions.selector

___

### seq\_interval

• `Optional` **seq\_interval**: `number`

Only available for http databases. Specifies that seq information only be generated every N changes.
Larger values can improve changes throughput with CouchDB 2.0 and later.
Note that last_seq is always populated regardless.

#### Inherited from

PouchDB.Core.ChangesOptions.seq\_interval

___

### since

• `Optional` **since**: `string` \| `number`

Start the results from the change immediately after the given sequence number.
You can also pass `'now'` if you want only new changes (when `live` is `true`).

#### Inherited from

PouchDB.Core.ChangesOptions.since

___

### style

• `Optional` **style**: ``"main_only"`` \| ``"all_docs"``

Specifies how many revisions are returned in the changes array.
The default, 'main_only', will only return the current “winning” revision;
'all_docs' will return all leaf revisions (including conflicts and deleted former conflicts).
Most likely you won’t need this unless you’re writing a replicator.

#### Inherited from

PouchDB.Core.ChangesOptions.style

___

### timeout

• `Optional` **timeout**: `number` \| ``false``

Request timeout (in milliseconds).

#### Inherited from

PouchDB.Core.ChangesOptions.timeout

___

### view

• `Optional` **view**: `string`

Specify a view function (e.g. 'design_doc_name/view_name' or 'view_name' as shorthand for 'view_name/view_name') to act as a filter.
Documents counted as “passed” for a view filter if a map function emits at least one record for them.
Note: options.filter must be set to '_view' for this option to work.

#### Inherited from

PouchDB.Core.ChangesOptions.view
