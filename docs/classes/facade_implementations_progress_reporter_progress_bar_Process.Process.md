[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/progress-reporter/progress-bar/Process](../modules/facade_implementations_progress_reporter_progress_bar_Process.md) / Process

# Class: Process

[facade-implementations/progress-reporter/progress-bar/Process](../modules/facade_implementations_progress_reporter_progress_bar_Process.md).Process

## Implements

- `Process`

## Table of contents

### Constructors

- [constructor](facade_implementations_progress_reporter_progress_bar_Process.Process.md#constructor)

### Properties

- [created](facade_implementations_progress_reporter_progress_bar_Process.Process.md#created)
- [state](facade_implementations_progress_reporter_progress_bar_Process.Process.md#state)

### Methods

- [done](facade_implementations_progress_reporter_progress_bar_Process.Process.md#done)
- [setAuto](facade_implementations_progress_reporter_progress_bar_Process.Process.md#setauto)
- [setProgress](facade_implementations_progress_reporter_progress_bar_Process.Process.md#setprogress)
- [setWeight](facade_implementations_progress_reporter_progress_bar_Process.Process.md#setweight)
- [update](facade_implementations_progress_reporter_progress_bar_Process.Process.md#update)
- [getProgress](facade_implementations_progress_reporter_progress_bar_Process.Process.md#getprogress)
- [reset](facade_implementations_progress_reporter_progress_bar_Process.Process.md#reset)
- [update](facade_implementations_progress_reporter_progress_bar_Process.Process.md#update-1)

## Constructors

### constructor

• **new Process**()

Creates class instance.

## Properties

### created

• `Protected` `Readonly` **created**: `number`

___

### state

• `Protected` `Readonly` **state**: `Writable`<[`ProcessState`](../interfaces/facade_implementations_progress_reporter_progress_bar_core.ProcessState.md)\>

## Methods

### done

▸ **done**(): [`Process`](facade_implementations_progress_reporter_progress_bar_Process.Process.md)

#### Returns

[`Process`](facade_implementations_progress_reporter_progress_bar_Process.Process.md)

#### Implementation of

progressReporter.Process.done

___

### setAuto

▸ **setAuto**(`expectedDuration`): [`Process`](facade_implementations_progress_reporter_progress_bar_Process.Process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expectedDuration` | `number` |

#### Returns

[`Process`](facade_implementations_progress_reporter_progress_bar_Process.Process.md)

#### Implementation of

progressReporter.Process.setAuto

___

### setProgress

▸ **setProgress**(`value`): [`Process`](facade_implementations_progress_reporter_progress_bar_Process.Process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`Process`](facade_implementations_progress_reporter_progress_bar_Process.Process.md)

#### Implementation of

progressReporter.Process.setProgress

___

### setWeight

▸ **setWeight**(`value`): [`Process`](facade_implementations_progress_reporter_progress_bar_Process.Process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`Process`](facade_implementations_progress_reporter_progress_bar_Process.Process.md)

#### Implementation of

progressReporter.Process.setWeight

___

### update

▸ `Protected` **update**(): `void`

Updates internal state.

#### Returns

`void`

___

### getProgress

▸ `Static` `Readonly` **getProgress**(): `number`

Returns progress.

#### Returns

`number`

Progress.

___

### reset

▸ `Static` `Readonly` **reset**(): `void`

Resets to initial state.

#### Returns

`void`

___

### update

▸ `Static` `Protected` `Readonly` **update**(): `void`

Updates progress bar state.

#### Returns

`void`
