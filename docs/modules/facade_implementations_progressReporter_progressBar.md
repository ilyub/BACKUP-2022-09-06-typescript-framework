[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/progressReporter/progressBar

# Module: facade-implementations/progressReporter/progressBar

## Table of contents

### Classes

- [Process](../classes/facade_implementations_progressReporter_progressBar.Process.md)

### Interfaces

- [Configuration](../interfaces/facade_implementations_progressReporter_progressBar.Configuration.md)

### Type aliases

- [State](facade_implementations_progressReporter_progressBar.md#state)

### Variables

- [implementation](facade_implementations_progressReporter_progressBar.md#implementation)

### Functions

- [configure](facade_implementations_progressReporter_progressBar.md#configure)
- [getConfiguration](facade_implementations_progressReporter_progressBar.md#getconfiguration)

## Type aliases

### State

Ƭ **State**: ``"auto"`` \| ``"done"`` \| ``"manual"``

## Variables

### implementation

• `Const` **implementation**: `Facade`

## Functions

### configure

▸ **configure**(`config`): `void`

Configures plugin.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`<[`Configuration`](../interfaces/facade_implementations_progressReporter_progressBar.Configuration.md)\> | Plugin configuration. |

#### Returns

`void`

___

### getConfiguration

▸ **getConfiguration**(): [`Configuration`](../interfaces/facade_implementations_progressReporter_progressBar.Configuration.md)

Returns plugin configuration.

#### Returns

[`Configuration`](../interfaces/facade_implementations_progressReporter_progressBar.Configuration.md)

Plugin configuration.
