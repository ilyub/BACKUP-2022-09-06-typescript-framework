[Typescript framework](../index.md) / [Exports](../modules.md) / [classes/database/Item](../modules/classes_database_Item.md) / Item

# Class: Item

[classes/database/Item](../modules/classes_database_Item.md).Item

## Table of contents

### Constructors

- [constructor](classes_database_Item.Item-1.md#constructor)

### Properties

- [\_deleted](classes_database_Item.Item-1.md#_deleted)
- [\_id](classes_database_Item.Item-1.md#_id)
- [\_rev](classes_database_Item.Item-1.md#_rev)
- [attachedDocs](classes_database_Item.Item-1.md#attacheddocs)
- [createdAt](classes_database_Item.Item-1.md#createdat)
- [deletedAt](classes_database_Item.Item-1.md#deletedat)
- [lastAttachedDocs](classes_database_Item.Item-1.md#lastattacheddocs)
- [softDeleted](classes_database_Item.Item-1.md#softdeleted)
- [updatedAt](classes_database_Item.Item-1.md#updatedat)

### Methods

- [doc](classes_database_Item.Item-1.md#doc)

## Constructors

### constructor

• **new Item**(`source`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | [`ExistingItemDoc`](../interfaces/classes_database_Item.Item.ExistingItemDoc.md) | Source. |

## Properties

### \_deleted

• `Readonly` **\_deleted**: `boolean`

___

### \_id

• `Readonly` **\_id**: `string`

___

### \_rev

• `Readonly` **\_rev**: `string`

___

### attachedDocs

• `Protected` `Readonly` **attachedDocs**: `undefined` \| `BaseStoredAttachedDocuments`

___

### createdAt

• `Readonly` **createdAt**: `stringU`

___

### deletedAt

• `Readonly` **deletedAt**: `stringU`

___

### lastAttachedDocs

• `Protected` `Readonly` **lastAttachedDocs**: `undefined` \| `numbers`

___

### softDeleted

• `Readonly` **softDeleted**: `boolean`

___

### updatedAt

• `Readonly` **updatedAt**: `stringU`

## Methods

### doc

▸ **doc**(): [`ExistingItemDoc`](../interfaces/classes_database_Item.Item.ExistingItemDoc.md)

Returns database document.

#### Returns

[`ExistingItemDoc`](../interfaces/classes_database_Item.Item.ExistingItemDoc.md)

Database document.
