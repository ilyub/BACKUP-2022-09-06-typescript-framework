[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md) / PouchPutDocument

# Interface: PouchPutDocument

[facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md).PouchPutDocument

## Hierarchy

- `PutDocument`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>

  ↳ **`PouchPutDocument`**

## Table of contents

### Properties

- [\_attachments](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md#_attachments)
- [\_conflicts](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md#_conflicts)
- [\_deleted](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md#_deleted)
- [\_id](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md#_id)
- [\_rev](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md#_rev)
- [attachedDocs](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md#attacheddocs)
- [filters](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md#filters)
- [lastAttachedDocs](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md#lastattacheddocs)
- [views](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchPutDocument.md#views)

## Properties

### \_attachments

• `Optional` **\_attachments**: `Attachments`

#### Inherited from

PouchDB.Core.PutDocument.\_attachments

___

### \_conflicts

• `Optional` **\_conflicts**: `string`[]

#### Inherited from

PouchDB.Core.PutDocument.\_conflicts

___

### \_deleted

• `Optional` **\_deleted**: `boolean`

#### Inherited from

PouchDB.Core.PutDocument.\_deleted

___

### \_id

• `Optional` **\_id**: `string`

#### Inherited from

PouchDB.Core.PutDocument.\_id

___

### \_rev

• `Optional` **\_rev**: `string`

You can update an existing doc using _rev

#### Inherited from

PouchDB.Core.PutDocument.\_rev

___

### attachedDocs

• `Optional` `Readonly` **attachedDocs**: `BaseStoredAttachedDocuments`

#### Inherited from

PouchDB.Core.PutDocument.attachedDocs

___

### filters

• `Optional` **filters**: `Object`

#### Index signature

▪ [filterName: `string`]: `string`

#### Inherited from

PouchDB.Core.PutDocument.filters

___

### lastAttachedDocs

• `Optional` `Readonly` **lastAttachedDocs**: `numbers`

#### Inherited from

PouchDB.Core.PutDocument.lastAttachedDocs

___

### views

• `Optional` **views**: `Object`

#### Index signature

▪ [viewName: `string`]: { `map`: `string` ; `reduce?`: `string`  }

#### Inherited from

PouchDB.Core.PutDocument.views
