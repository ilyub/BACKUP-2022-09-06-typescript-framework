[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/progressReporter/progressBar/Process](../modules/facade_implementations_progressReporter_progressBar_Process.md) / Process

# Class: Process

[facade-implementations/progressReporter/progressBar/Process](../modules/facade_implementations_progressReporter_progressBar_Process.md).Process

## Implements

- `Process`

## Table of contents

### Constructors

- [constructor](facade_implementations_progressReporter_progressBar_Process.Process.md#constructor)

### Properties

- [created](facade_implementations_progressReporter_progressBar_Process.Process.md#created)
- [expectedDuration](facade_implementations_progressReporter_progressBar_Process.Process.md#expectedduration)
- [id](facade_implementations_progressReporter_progressBar_Process.Process.md#id)
- [lastAutoGrow](facade_implementations_progressReporter_progressBar_Process.Process.md#lastautogrow)
- [progress](facade_implementations_progressReporter_progressBar_Process.Process.md#progress)
- [state](facade_implementations_progressReporter_progressBar_Process.Process.md#state)
- [weight](facade_implementations_progressReporter_progressBar_Process.Process.md#weight)

### Methods

- [done](facade_implementations_progressReporter_progressBar_Process.Process.md#done)
- [setAuto](facade_implementations_progressReporter_progressBar_Process.Process.md#setauto)
- [setProgress](facade_implementations_progressReporter_progressBar_Process.Process.md#setprogress)
- [setWeight](facade_implementations_progressReporter_progressBar_Process.Process.md#setweight)
- [update](facade_implementations_progressReporter_progressBar_Process.Process.md#update)

## Constructors

### constructor

• **new Process**()

Creates class instance.

## Properties

### created

• `Protected` `Readonly` **created**: `number`

___

### expectedDuration

• `Protected` **expectedDuration**: `number` = `0`

___

### id

• `Protected` `Readonly` **id**: `symbol`

___

### lastAutoGrow

• `Protected` **lastAutoGrow**: `number`

___

### progress

• `Protected` **progress**: `number` = `0`

___

### state

• `Protected` **state**: [`State`](../modules/facade_implementations_progressReporter_progressBar_Process.md#state) = `"manual"`

___

### weight

• `Protected` **weight**: `number` = `1`

## Methods

### done

▸ **done**(): [`Process`](facade_implementations_progressReporter_progressBar_Process.Process.md)

#### Returns

[`Process`](facade_implementations_progressReporter_progressBar_Process.Process.md)

#### Implementation of

progressReporter.Process.done

___

### setAuto

▸ **setAuto**(`expectedDuration`): [`Process`](facade_implementations_progressReporter_progressBar_Process.Process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expectedDuration` | `number` |

#### Returns

[`Process`](facade_implementations_progressReporter_progressBar_Process.Process.md)

#### Implementation of

progressReporter.Process.setAuto

___

### setProgress

▸ **setProgress**(`value`): [`Process`](facade_implementations_progressReporter_progressBar_Process.Process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`Process`](facade_implementations_progressReporter_progressBar_Process.Process.md)

#### Implementation of

progressReporter.Process.setProgress

___

### setWeight

▸ **setWeight**(`value`): [`Process`](facade_implementations_progressReporter_progressBar_Process.Process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`Process`](facade_implementations_progressReporter_progressBar_Process.Process.md)

#### Implementation of

progressReporter.Process.setWeight

___

### update

▸ `Static` `Protected` **update**(`this`): `void`

Updates progress bar state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `void` | This argument. |

#### Returns

`void`
