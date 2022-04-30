[Typescript framework](../index.md) / [Exports](../modules.md) / [classes/database/AttachedItem](../modules/classes_database_AttachedItem.md) / AttachedItem

# Class: AttachedItem<T\>

[classes/database/AttachedItem](../modules/classes_database_AttachedItem.md).AttachedItem

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Item`](classes_database_Item.Item-1.md) = [`Item`](classes_database_Item.Item-1.md) |

## Table of contents

### Constructors

- [constructor](classes_database_AttachedItem.AttachedItem-1.md#constructor)

### Properties

- [\_deleted](classes_database_AttachedItem.AttachedItem-1.md#_deleted)
- [\_id](classes_database_AttachedItem.AttachedItem-1.md#_id)
- [\_parent](classes_database_AttachedItem.AttachedItem-1.md#_parent)
- [\_parentDoc](classes_database_AttachedItem.AttachedItem-1.md#_parentdoc)
- [\_rev](classes_database_AttachedItem.AttachedItem-1.md#_rev)
- [createdAt](classes_database_AttachedItem.AttachedItem-1.md#createdat)
- [deletedAt](classes_database_AttachedItem.AttachedItem-1.md#deletedat)
- [softDeleted](classes_database_AttachedItem.AttachedItem-1.md#softdeleted)
- [updatedAt](classes_database_AttachedItem.AttachedItem-1.md#updatedat)

### Accessors

- [id](classes_database_AttachedItem.AttachedItem-1.md#id)
- [parent](classes_database_AttachedItem.AttachedItem-1.md#parent)

### Methods

- [doc](classes_database_AttachedItem.AttachedItem-1.md#doc)
- [getParent](classes_database_AttachedItem.AttachedItem-1.md#getparent)

## Constructors

### constructor

• **new AttachedItem**<`T`\>(`source`)

Creates class instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Item`](classes_database_Item.Item-1.md)<`T`\> = [`Item`](classes_database_Item.Item-1.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | [`ExistingAttachedItemDoc`](../interfaces/classes_database_AttachedItem.AttachedItem.ExistingAttachedItemDoc.md) | Source. |

## Properties

### \_deleted

• `Readonly` **\_deleted**: `boolean`

___

### \_id

• `Readonly` **\_id**: `number`

___

### \_parent

• `Protected` **\_parent**: `undefined` \| `T`

___

### \_parentDoc

• `Protected` `Readonly` **\_parentDoc**: `BaseExistingDocument`

___

### \_rev

• `Readonly` **\_rev**: `number`

___

### createdAt

• `Readonly` **createdAt**: `stringU`

___

### deletedAt

• `Readonly` **deletedAt**: `stringU`

___

### softDeleted

• `Readonly` **softDeleted**: `boolean`

___

### updatedAt

• `Readonly` **updatedAt**: `stringU`

## Accessors

### id

• `get` **id**(): `string`

Unique combined ID.

#### Returns

`string`

___

### parent

• `get` **parent**(): `T`

Parent item.

#### Returns

`T`

## Methods

### doc

▸ **doc**(): [`ExistingAttachedItemDoc`](../interfaces/classes_database_AttachedItem.AttachedItem.ExistingAttachedItemDoc.md)

Returns database document.

#### Returns

[`ExistingAttachedItemDoc`](../interfaces/classes_database_AttachedItem.AttachedItem.ExistingAttachedItemDoc.md)

Database document.

___

### getParent

▸ `Protected` `Abstract` **getParent**(): `T`

Initializes parent.

#### Returns

`T`
