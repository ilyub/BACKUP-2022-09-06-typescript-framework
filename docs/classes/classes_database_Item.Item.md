[Typescript framework](../index.md) / [Exports](../modules.md) / [classes/database/Item](../modules/classes_database_Item.md) / Item

# Class: Item

[classes/database/Item](../modules/classes_database_Item.md).Item

## Table of contents

### Constructors

- [constructor](classes_database_Item.Item.md#constructor)

### Properties

- [\_deleted](classes_database_Item.Item.md#_deleted)
- [\_id](classes_database_Item.Item.md#_id)
- [\_rev](classes_database_Item.Item.md#_rev)
- [attachedDocs](classes_database_Item.Item.md#attacheddocs)
- [lastAttachedDoc](classes_database_Item.Item.md#lastattacheddoc)

### Methods

- [doc](classes_database_Item.Item.md#doc)

## Constructors

### constructor

• **new Item**(`source`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | [`ItemDoc`](../interfaces/classes_database_Item.ItemDoc.md) | Source. |

## Properties

### \_deleted

• `Readonly` **\_deleted**: `boolean`

___

### \_id

• `Readonly` **\_id**: `string`

___

### \_rev

• `Readonly` **\_rev**: `stringU`

___

### attachedDocs

• `Protected` `Readonly` **attachedDocs**: `undefined` \| `StoredAttachedDocuments`

___

### lastAttachedDoc

• `Protected` `Readonly` **lastAttachedDoc**: `numberU`

## Methods

### doc

▸ **doc**(): [`ItemDoc`](../interfaces/classes_database_Item.ItemDoc.md)

Returns database document.

#### Returns

[`ItemDoc`](../interfaces/classes_database_Item.ItemDoc.md)

Database document.
