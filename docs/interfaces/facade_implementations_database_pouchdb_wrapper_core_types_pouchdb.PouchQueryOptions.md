[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md) / PouchQueryOptions

# Interface: PouchQueryOptions

[facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md).PouchQueryOptions

## Hierarchy

- `Options`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md), [`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>

  ↳ **`PouchQueryOptions`**

## Table of contents

### Properties

- [attachments](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#attachments)
- [binary](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#binary)
- [conflicts](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#conflicts)
- [descending](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#descending)
- [endkey](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#endkey)
- [group](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#group)
- [group\_level](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#group_level)
- [include\_docs](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#include_docs)
- [inclusive\_end](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#inclusive_end)
- [key](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#key)
- [keys](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#keys)
- [limit](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#limit)
- [reduce](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#reduce)
- [skip](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#skip)
- [stale](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#stale)
- [startkey](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#startkey)
- [update\_seq](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryOptions.md#update_seq)

## Properties

### attachments

• `Optional` **attachments**: `boolean`

Include attachment data.

#### Inherited from

PouchDB.Query.Options.attachments

___

### binary

• `Optional` **binary**: `boolean`

Return attachment data as Blobs/Buffers, instead of as base64-encoded strings.

#### Inherited from

PouchDB.Query.Options.binary

___

### conflicts

• `Optional` **conflicts**: `boolean`

Include conflicts in the _conflicts field of a doc.

#### Inherited from

PouchDB.Query.Options.conflicts

___

### descending

• `Optional` **descending**: `boolean`

Reverse the order of the output rows.

#### Inherited from

PouchDB.Query.Options.descending

___

### endkey

• `Optional` **endkey**: `any`

Get rows with keys in a certain range (inclusive/inclusive).

#### Inherited from

PouchDB.Query.Options.endkey

___

### group

• `Optional` **group**: `boolean`

True if you want the reduce function to group results by keys, rather than returning a single result.

#### Inherited from

PouchDB.Query.Options.group

___

### group\_level

• `Optional` **group\_level**: `number`

Number of elements in a key to group by, assuming the keys are arrays.
Defaults to the full length of the array.

#### Inherited from

PouchDB.Query.Options.group\_level

___

### include\_docs

• `Optional` **include\_docs**: `boolean`

Include the document in each row in the doc field.

#### Inherited from

PouchDB.Query.Options.include\_docs

___

### inclusive\_end

• `Optional` **inclusive\_end**: `boolean`

Include rows having a key equal to the given options.endkey.

#### Inherited from

PouchDB.Query.Options.inclusive\_end

___

### key

• `Optional` **key**: `any`

Only return rows matching this key.

#### Inherited from

PouchDB.Query.Options.key

___

### keys

• `Optional` **keys**: `any`[]

Array of keys to fetch in a single shot.

#### Inherited from

PouchDB.Query.Options.keys

___

### limit

• `Optional` **limit**: `number`

Maximum number of rows to return.

#### Inherited from

PouchDB.Query.Options.limit

___

### reduce

• `Optional` **reduce**: `boolean` \| `BuiltInReducers` \| `Reducer`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md), [`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>

Reduce function, or the string name of a built-in function: '_sum', '_count', or '_stats'.

#### Inherited from

PouchDB.Query.Options.reduce

___

### skip

• `Optional` **skip**: `number`

Number of rows to skip before returning (warning: poor performance on IndexedDB/LevelDB!).

#### Inherited from

PouchDB.Query.Options.skip

___

### stale

• `Optional` **stale**: ``"ok"`` \| ``"update_after"``

unspecified (default): Returns the latest results, waiting for the view to build if necessary.
'ok': Returns results immediately, even if they’re out-of-date.
'update_after': Returns results immediately, but kicks off a build afterwards.

#### Inherited from

PouchDB.Query.Options.stale

___

### startkey

• `Optional` **startkey**: `any`

Get rows with keys in a certain range (inclusive/inclusive).

#### Inherited from

PouchDB.Query.Options.startkey

___

### update\_seq

• `Optional` **update\_seq**: `boolean`

Include an update_seq value indicating which sequence id
of the underlying database the view reflects.

#### Inherited from

PouchDB.Query.Options.update\_seq
