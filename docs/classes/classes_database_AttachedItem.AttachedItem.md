[Typescript framework](../index.md) / [Exports](../modules.md) / [classes/database/AttachedItem](../modules/classes_database_AttachedItem.md) / AttachedItem

# Class: AttachedItem<T\>

[classes/database/AttachedItem](../modules/classes_database_AttachedItem.md).AttachedItem

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Item`](classes_database_Item.Item.md) = [`Item`](classes_database_Item.Item.md) |

## Table of contents

### Constructors

- [constructor](classes_database_AttachedItem.AttachedItem.md#constructor)

### Properties

- [\_deleted](classes_database_AttachedItem.AttachedItem.md#_deleted)
- [\_id](classes_database_AttachedItem.AttachedItem.md#_id)
- [\_parent](classes_database_AttachedItem.AttachedItem.md#_parent)
- [\_parentDoc](classes_database_AttachedItem.AttachedItem.md#_parentdoc)
- [\_rev](classes_database_AttachedItem.AttachedItem.md#_rev)

### Accessors

- [parent](classes_database_AttachedItem.AttachedItem.md#parent)

### Methods

- [doc](classes_database_AttachedItem.AttachedItem.md#doc)
- [getParent](classes_database_AttachedItem.AttachedItem.md#getparent)

## Constructors

### constructor

• **new AttachedItem**<`T`\>(`source`)

Creates class instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Item`](classes_database_Item.Item.md)<`T`\> = [`Item`](classes_database_Item.Item.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | [`AttachedItemDoc`](../interfaces/classes_database_AttachedItem.AttachedItemDoc.md) | Source. |

## Properties

### \_deleted

• `Readonly` **\_deleted**: `boolean`

___

### \_id

• `Readonly` **\_id**: `numberU`

___

### \_parent

• `Protected` **\_parent**: `undefined` \| `T` = `undefined`

___

### \_parentDoc

• `Protected` **\_parentDoc**: [`ItemDoc`](../interfaces/classes_database_Item.ItemDoc.md)

___

### \_rev

• `Readonly` **\_rev**: `numberU`

## Accessors

### parent

• `get` **parent**(): `T`

Returns parent item.

#### Returns

`T`

## Methods

### doc

▸ **doc**(): [`AttachedItemDoc`](../interfaces/classes_database_AttachedItem.AttachedItemDoc.md)

Returns database document.

#### Returns

[`AttachedItemDoc`](../interfaces/classes_database_AttachedItem.AttachedItemDoc.md)

Database document.

___

### getParent

▸ `Protected` **getParent**(): `T`

Initializes parent.

#### Returns

`T`
