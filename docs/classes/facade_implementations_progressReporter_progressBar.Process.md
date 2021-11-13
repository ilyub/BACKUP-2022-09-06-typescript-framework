[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/progressReporter/progressBar](../modules/facade_implementations_progressReporter_progressBar.md) / Process

# Class: Process

[facade-implementations/progressReporter/progressBar](../modules/facade_implementations_progressReporter_progressBar.md).Process

## Implements

- `ProcessInterface`

## Table of contents

### Constructors

- [constructor](facade_implementations_progressReporter_progressBar.Process.md#constructor)

### Properties

- [created](facade_implementations_progressReporter_progressBar.Process.md#created)
- [expectedDuration](facade_implementations_progressReporter_progressBar.Process.md#expectedduration)
- [id](facade_implementations_progressReporter_progressBar.Process.md#id)
- [lastAutoGrow](facade_implementations_progressReporter_progressBar.Process.md#lastautogrow)
- [progress](facade_implementations_progressReporter_progressBar.Process.md#progress)
- [state](facade_implementations_progressReporter_progressBar.Process.md#state)
- [weight](facade_implementations_progressReporter_progressBar.Process.md#weight)

### Methods

- [done](facade_implementations_progressReporter_progressBar.Process.md#done)
- [setAuto](facade_implementations_progressReporter_progressBar.Process.md#setauto)
- [setProgress](facade_implementations_progressReporter_progressBar.Process.md#setprogress)
- [setWeight](facade_implementations_progressReporter_progressBar.Process.md#setweight)
- [update](facade_implementations_progressReporter_progressBar.Process.md#update)

## Constructors

### constructor

• **new Process**()

Creates class instance.

## Properties

### created

• `Protected` **created**: `number`

___

### expectedDuration

• `Protected` **expectedDuration**: `number` = `0`

___

### id

• `Protected` **id**: `symbol`

___

### lastAutoGrow

• `Protected` **lastAutoGrow**: `number`

___

### progress

• `Protected` **progress**: `number` = `0`

___

### state

• `Protected` **state**: [`State`](../modules/facade_implementations_progressReporter_progressBar.md#state) = `"manual"`

___

### weight

• `Protected` **weight**: `number` = `1`

## Methods

### done

▸ **done**(): [`Process`](facade_implementations_progressReporter_progressBar.Process.md)

#### Returns

[`Process`](facade_implementations_progressReporter_progressBar.Process.md)

#### Implementation of

ProcessInterface.done

___

### setAuto

▸ **setAuto**(`expectedDuration`): [`Process`](facade_implementations_progressReporter_progressBar.Process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expectedDuration` | `number` |

#### Returns

[`Process`](facade_implementations_progressReporter_progressBar.Process.md)

#### Implementation of

ProcessInterface.setAuto

___

### setProgress

▸ **setProgress**(`value`): [`Process`](facade_implementations_progressReporter_progressBar.Process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`Process`](facade_implementations_progressReporter_progressBar.Process.md)

#### Implementation of

ProcessInterface.setProgress

___

### setWeight

▸ **setWeight**(`value`): [`Process`](facade_implementations_progressReporter_progressBar.Process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`Process`](facade_implementations_progressReporter_progressBar.Process.md)

#### Implementation of

ProcessInterface.setWeight

___

### update

▸ `Static` `Protected` **update**(): `void`

Updates progress bar state.

#### Returns

`void`
