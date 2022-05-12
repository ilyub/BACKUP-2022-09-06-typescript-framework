[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md) / PouchChange

# Interface: PouchChange

[facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md).PouchChange

## Hierarchy

- `ChangesResponseChange`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>

  ↳ **`PouchChange`**

## Table of contents

### Properties

- [changes](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChange.md#changes)
- [deleted](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChange.md#deleted)
- [doc](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChange.md#doc)
- [id](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChange.md#id)
- [seq](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChange.md#seq)

## Properties

### changes

• **changes**: { `rev`: `string`  }[]

#### Inherited from

PouchDB.Core.ChangesResponseChange.changes

___

### deleted

• `Optional` **deleted**: `boolean`

#### Inherited from

PouchDB.Core.ChangesResponseChange.deleted

___

### doc

• `Optional` **doc**: `ExistingDocument`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `ChangesMeta`\>

#### Inherited from

PouchDB.Core.ChangesResponseChange.doc

___

### id

• **id**: `string`

#### Inherited from

PouchDB.Core.ChangesResponseChange.id

___

### seq

• **seq**: `string` \| `number`

#### Inherited from

PouchDB.Core.ChangesResponseChange.seq
