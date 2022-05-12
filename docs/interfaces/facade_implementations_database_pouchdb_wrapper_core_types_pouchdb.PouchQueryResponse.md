[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md) / PouchQueryResponse

# Interface: PouchQueryResponse

[facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md).PouchQueryResponse

## Hierarchy

- `Response`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>

  ↳ **`PouchQueryResponse`**

## Table of contents

### Properties

- [offset](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryResponse.md#offset)
- [rows](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryResponse.md#rows)
- [total\_rows](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchQueryResponse.md#total_rows)

## Properties

### offset

• **offset**: `number`

#### Inherited from

PouchDB.Query.Response.offset

___

### rows

• **rows**: { `doc?`: `ExistingDocument`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md) & `AllDocsMeta`\> ; `id`: `any` ; `key`: `any` ; `value`: `any`  }[]

#### Inherited from

PouchDB.Query.Response.rows

___

### total\_rows

• **total\_rows**: `number`

#### Inherited from

PouchDB.Query.Response.total\_rows
