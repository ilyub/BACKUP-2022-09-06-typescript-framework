[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md) / PouchGetMeta

# Interface: PouchGetMeta

[facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md).PouchGetMeta

## Hierarchy

- `GetMeta`

  ↳ **`PouchGetMeta`**

## Table of contents

### Properties

- [\_attachments](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchGetMeta.md#_attachments)
- [\_conflicts](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchGetMeta.md#_conflicts)
- [\_rev](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchGetMeta.md#_rev)
- [\_revisions](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchGetMeta.md#_revisions)
- [\_revs\_info](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchGetMeta.md#_revs_info)

## Properties

### \_attachments

• `Optional` **\_attachments**: `Attachments`

Attachments where index is attachmentId

#### Inherited from

PouchDB.Core.GetMeta.\_attachments

___

### \_conflicts

• `Optional` **\_conflicts**: `string`[]

Conflicting leaf revisions.

Only present if `GetOptions.conflicts` is `true`

#### Inherited from

PouchDB.Core.GetMeta.\_conflicts

___

### \_rev

• **\_rev**: `string`

#### Inherited from

PouchDB.Core.GetMeta.\_rev

___

### \_revisions

• `Optional` **\_revisions**: `Object`

Only present if `GetOptions.revs_info` is `true`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |
| `start` | `number` |

#### Inherited from

PouchDB.Core.GetMeta.\_revisions

___

### \_revs\_info

• `Optional` **\_revs\_info**: `RevisionInfo`[]

Only present if `GetOptions.revs` is `true`

#### Inherited from

PouchDB.Core.GetMeta.\_revs\_info
