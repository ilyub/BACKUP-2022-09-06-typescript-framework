[Typescript framework](../index.md) / [Exports](../modules.md) / [actions/Confirmable](../modules/actions_Confirmable.md) / Confirmable

# Class: Confirmable<A\>

[actions/Confirmable](../modules/actions_Confirmable.md).Confirmable

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `unknown`[] |

## Hierarchy

- [`Action`](actions_Action.Action.md)<`A`, `void`\>

  ↳ **`Confirmable`**

## Table of contents

### Constructors

- [constructor](actions_Confirmable.Confirmable.md#constructor)

### Properties

- [\_running](actions_Confirmable.Confirmable.md#_running)
- [errorMessage](actions_Confirmable.Confirmable.md#errormessage)
- [message](actions_Confirmable.Confirmable.md#message)
- [type](actions_Confirmable.Confirmable.md#type)

### Accessors

- [running](actions_Confirmable.Confirmable.md#running)

### Methods

- [\_execute](actions_Confirmable.Confirmable.md#_execute)
- [execute](actions_Confirmable.Confirmable.md#execute)
- [spawn](actions_Confirmable.Confirmable.md#spawn)

## Constructors

### constructor

• **new Confirmable**<`A`\>(`message?`)

Creates class instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `unknown`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message?` | `string` | Confirmation message. |

#### Overrides

[Action](actions_Action.Action.md).[constructor](actions_Action.Action.md#constructor)

## Properties

### \_running

• `Protected` **\_running**: `number` = `0`

#### Inherited from

[Action](actions_Action.Action.md).[_running](actions_Action.Action.md#_running)

___

### errorMessage

• `Readonly` **errorMessage**: `stringU` = `undefined`

#### Inherited from

[Action](actions_Action.Action.md).[errorMessage](actions_Action.Action.md#errormessage)

___

### message

• `Protected` **message**: `stringU` = `undefined`

___

### type

• `Readonly` **type**: `undefined` \| `TaskType` = `undefined`

#### Inherited from

[Action](actions_Action.Action.md).[type](actions_Action.Action.md#type)

## Accessors

### running

• `get` **running**(): `boolean`

Checks if action is running.

#### Returns

`boolean`

_True_ if action is running, _false_ otherwise.

#### Inherited from

Action.running

## Methods

### \_execute

▸ `Protected` **_execute**(...`_args`): `Promise`<`void`\>

Executes action.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `..._args` | `A` | Arguments. |

#### Returns

`Promise`<`void`\>

Result.

#### Inherited from

[Action](actions_Action.Action.md).[_execute](actions_Action.Action.md#_execute)

___

### execute

▸ **execute**(...`args`): `Promise`<`void`\>

Executes action.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `A` | Arguments. |

#### Returns

`Promise`<`void`\>

Result.

#### Overrides

[Action](actions_Action.Action.md).[execute](actions_Action.Action.md#execute)

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

#### Inherited from

[Action](actions_Action.Action.md).[spawn](actions_Action.Action.md#spawn)
