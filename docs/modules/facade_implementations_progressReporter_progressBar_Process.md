[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/progressReporter/progressBar/Process

# Module: facade-implementations/progressReporter/progressBar/Process

## Table of contents

### Classes

- [Process](../classes/facade_implementations_progressReporter_progressBar_Process.Process.md)

### Interfaces

- [Configuration](../interfaces/facade_implementations_progressReporter_progressBar_Process.Configuration.md)

### Type aliases

- [State](facade_implementations_progressReporter_progressBar_Process.md#state)

### Variables

- [facade](facade_implementations_progressReporter_progressBar_Process.md#facade)

### Functions

- [configure](facade_implementations_progressReporter_progressBar_Process.md#configure)
- [getConfiguration](facade_implementations_progressReporter_progressBar_Process.md#getconfiguration)

## Type aliases

### State

Ƭ **State**: ``"auto"`` \| ``"done"`` \| ``"manual"``

## Variables

### facade

• `Const` **facade**: `progressReporter.Facade`

## Functions

### configure

▸ **configure**(`config`): `void`

Configures plugin.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`<[`Configuration`](../interfaces/facade_implementations_progressReporter_progressBar_Process.Configuration.md)\> | Plugin configuration. |

#### Returns

`void`

___

### getConfiguration

▸ **getConfiguration**(): [`Configuration`](../interfaces/facade_implementations_progressReporter_progressBar_Process.Configuration.md)

Returns plugin configuration.

#### Returns

[`Configuration`](../interfaces/facade_implementations_progressReporter_progressBar_Process.Configuration.md)

Plugin configuration.
