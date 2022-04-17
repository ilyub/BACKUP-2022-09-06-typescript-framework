[Typescript framework](../index.md) / [Exports](../modules.md) / dev/pouchdb-collate

# Module: dev/pouchdb-collate

## Table of contents

### Functions

- [collate](dev_pouchdb_collate.md#collate)
- [parseIndexableString](dev_pouchdb_collate.md#parseindexablestring)
- [toIndexableString](dev_pouchdb_collate.md#toindexablestring)

## Functions

### collate

▸ **collate**(`key1`, `key2`): `number`

Compares two keys.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key1` | `unknown` | Key 1. |
| `key2` | `unknown` | Key 2. |

#### Returns

`number`

Comparison result.

___

### parseIndexableString

▸ **parseIndexableString**(`key`): `unknown`

Unserializes key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key. |

#### Returns

`unknown`

Unserialized key.

___

### toIndexableString

▸ **toIndexableString**(`key`): `string`

Serializes key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `unknown` | Key. |

#### Returns

`string`

Serialized key.
