[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/progress-reporter/progress-bar/core

# Module: facade-implementations/progress-reporter/progress-bar/core

## Table of contents

### Interfaces

- [Configuration](../interfaces/facade_implementations_progress_reporter_progress_bar_core.Configuration.md)
- [PartialConfiguration](../interfaces/facade_implementations_progress_reporter_progress_bar_core.PartialConfiguration.md)
- [ProcessState](../interfaces/facade_implementations_progress_reporter_progress_bar_core.ProcessState.md)

### Type aliases

- [State](facade_implementations_progress_reporter_progress_bar_core.md#state)

### Variables

- [moduleConfig](facade_implementations_progress_reporter_progress_bar_core.md#moduleconfig)

### Functions

- [finalEasing](facade_implementations_progress_reporter_progress_bar_core.md#finaleasing)
- [growProgress](facade_implementations_progress_reporter_progress_bar_core.md#growprogress)

## Type aliases

### State

Ƭ **State**: ``"auto"`` \| ``"done"`` \| ``"finalEasing"`` \| ``"manual"``

## Variables

### moduleConfig

• `Const` **moduleConfig**: [`Configuration`](../interfaces/facade_implementations_progress_reporter_progress_bar_core.Configuration.md)

## Functions

### finalEasing

▸ **finalEasing**(`mutableState`): `void`

Performs final easing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mutableState` | `Writable`<[`ProcessState`](../interfaces/facade_implementations_progress_reporter_progress_bar_core.ProcessState.md)\> | Process state. |

#### Returns

`void`

___

### growProgress

▸ **growProgress**(`mutableState`): `void`

Grows progress.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mutableState` | `Writable`<[`ProcessState`](../interfaces/facade_implementations_progress_reporter_progress_bar_core.ProcessState.md)\> | Process state. |

#### Returns

`void`
