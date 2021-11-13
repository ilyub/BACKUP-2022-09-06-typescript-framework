[Typescript framework](../index.md) / [Exports](../modules.md) / [decorators/OwnProperty](decorators_OwnProperty.md) / OwnProperty

# Namespace: OwnProperty

[decorators/OwnProperty](decorators_OwnProperty.md).OwnProperty

## Table of contents

### Variables

- [ClassDecorator](decorators_OwnProperty.OwnProperty.md#classdecorator)
- [resetValidators](decorators_OwnProperty.OwnProperty.md#resetvalidators)
- [validate](decorators_OwnProperty.OwnProperty.md#validate)

## Variables

### ClassDecorator

• **ClassDecorator**: <T\>(`ctor`: `T`) => `T`

#### Type declaration

▸ <`T`\>(`ctor`): `T`

Class decorator. Converts properties into own properties.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Constructor`<`object`\> |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctor` | `T` | Constructor. |

##### Returns

`T`

Constructor.

___

### resetValidators

• **resetValidators**: () => `void`

#### Type declaration

▸ (): `void`

Reset validators.

##### Returns

`void`

___

### validate

• **validate**: () => `void`

#### Type declaration

▸ (): `void`

Checks for missing class decorators.

##### Returns

`void`
