[Typescript framework](../index.md) / [Exports](../modules.md) / decorators/OwnProperty

# Module: decorators/OwnProperty

## Table of contents

### Namespaces

- [OwnProperty](decorators_OwnProperty.OwnProperty.md)

### Functions

- [OwnProperty](decorators_OwnProperty.md#ownproperty)
- [OwnPropertyClassDecorator](decorators_OwnProperty.md#ownpropertyclassdecorator)
- [OwnPropertyResetValidators](decorators_OwnProperty.md#ownpropertyresetvalidators)
- [OwnPropertyValidate](decorators_OwnProperty.md#ownpropertyvalidate)

## Functions

### OwnProperty

▸ **OwnProperty**(`target`, `key`): `void`

Property decorator. Converts property into own property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `object` | Target object. |
| `key` | `string` | Property name. |

#### Returns

`void`

___

### OwnPropertyClassDecorator

▸ **OwnPropertyClassDecorator**<`T`\>(`ctor`): `T`

Class decorator. Converts properties into own properties.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Constructor`<`object`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctor` | `T` | Constructor. |

#### Returns

`T`

Constructor.

___

### OwnPropertyResetValidators

▸ **OwnPropertyResetValidators**(): `void`

Reset validators.

#### Returns

`void`

___

### OwnPropertyValidate

▸ **OwnPropertyValidate**(): `void`

Checks for missing class decorators.

#### Returns

`void`
