[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/database/pouchdb-wrapper/core/misc

# Module: facade-implementations/database/pouchdb-wrapper/core/misc

## Table of contents

### Functions

- [extractAttachedDoc](facade_implementations_database_pouchdb_wrapper_core_misc.md#extractattacheddoc)
- [extractDoc](facade_implementations_database_pouchdb_wrapper_core_misc.md#extractdoc)
- [handlePouchError](facade_implementations_database_pouchdb_wrapper_core_misc.md#handlepoucherror)
- [validatePutDocument](facade_implementations_database_pouchdb_wrapper_core_misc.md#validateputdocument)
- [wrapPouchError](facade_implementations_database_pouchdb_wrapper_core_misc.md#wrappoucherror)

## Functions

### extractAttachedDoc

▸ **extractAttachedDoc**(`rawDoc`, `id`, `extractDeleted?`): `database.ExistingAttachedDocument` \| `undefined`

Extracts attached document.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `rawDoc` | `ExistingDocument` | `undefined` | Raw document. |
| `id` | `number` | `undefined` | Attached document ID. |
| `extractDeleted` | `boolean` | `false` | Whether to extract deleted document. |

#### Returns

`database.ExistingAttachedDocument` \| `undefined`

Attached document if exists, _undefined_ otherwise.

___

### extractDoc

▸ **extractDoc**(`rawDoc`): `database.ExistingDocument`

Extracts document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawDoc` | `ExistingDocument` | Raw document. |

#### Returns

`database.ExistingDocument`

Document.

___

### handlePouchError

▸ **handlePouchError**(`error`): `void`

Handles PouchDB error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `unknown` | Error. |

#### Returns

`void`

___

### validatePutDocument

▸ **validatePutDocument**(`doc`): `void`

Validates document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | `PutDocument` | Document. |

#### Returns

`void`

___

### wrapPouchError

▸ **wrapPouchError**(`value`): `unknown`

Converts pouchdb error to conventional error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Value. |

#### Returns

`unknown`

Converted pouchdb error or original value.
