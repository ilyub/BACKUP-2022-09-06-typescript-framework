[Typescript framework](../index.md) / [Exports](../modules.md) / [actions/Action](../modules/actions_Action.md) / Action

# Class: Action<A, R\>

[actions/Action](../modules/actions_Action.md).Action

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `unknown`[] |
| `R` | `R` |

## Hierarchy

- **`Action`**

  ↳ [`Confirmable`](actions_Confirmable.Confirmable.md)

## Table of contents

### Constructors

- [constructor](actions_Action.Action.md#constructor)

### Properties

- [\_running](actions_Action.Action.md#_running)
- [errorMessage](actions_Action.Action.md#errormessage)
- [type](actions_Action.Action.md#type)

### Accessors

- [running](actions_Action.Action.md#running)

### Methods

- [\_execute](actions_Action.Action.md#_execute)
- [execute](actions_Action.Action.md#execute)
- [spawn](actions_Action.Action.md#spawn)

## Constructors

### constructor

• **new Action**<`A`, `R`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `unknown`[] |
| `R` | `R` |

## Properties

### \_running

• `Protected` **\_running**: `number` = `0`

___

### errorMessage

• `Readonly` **errorMessage**: `stringU` = `undefined`

___

### type

• `Readonly` **type**: `undefined` \| `TaskType` = `undefined`

## Accessors

### running

• `get` **running**(): `boolean`

Checks if action is running.

#### Returns

`boolean`

_True_ if action is running, _false_ otherwise.

## Methods

### \_execute

▸ `Protected` **_execute**(...`_args`): `Promise`<`R`\>

Executes action.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `..._args` | `A` | Arguments. |

#### Returns

`Promise`<`R`\>

Result.

___

### execute

▸ **execute**(...`args`): `Promise`<`R`\>

Executes action.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `A` | Arguments. |

#### Returns

`Promise`<`R`\>

Result.

___

### spawn

▸ **spawn**(...`args`): `void`

Starts action.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `A` | Arguments. |

#### Returns

`void`
