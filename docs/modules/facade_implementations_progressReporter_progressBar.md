[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/progressReporter/progressBar

# Module: facade-implementations/progressReporter/progressBar

## Table of contents

### Classes

- [Process](../classes/facade_implementations_progressReporter_progressBar.Process.md)

### Interfaces

- [Configuration](../interfaces/facade_implementations_progressReporter_progressBar.Configuration.md)

### Type aliases

- [PartialConfiguration](facade_implementations_progressReporter_progressBar.md#partialconfiguration)
- [State](facade_implementations_progressReporter_progressBar.md#state)

### Variables

- [implementation](facade_implementations_progressReporter_progressBar.md#implementation)

### Functions

- [configure](facade_implementations_progressReporter_progressBar.md#configure)
- [getConfiguration](facade_implementations_progressReporter_progressBar.md#getconfiguration)

## Type aliases

### PartialConfiguration

Ƭ **PartialConfiguration**<`K`\>: { readonly [L in K]: Configuration[L] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`Configuration`](../interfaces/facade_implementations_progressReporter_progressBar.Configuration.md) |

___

### State

Ƭ **State**: ``"manual"`` \| ``"auto"`` \| ``"done"``

## Variables

### implementation

• **implementation**: `Facade`

## Functions

### configure

▸ **configure**<`K`\>(`config`): `void`

Configures plugin.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`Configuration`](../interfaces/facade_implementations_progressReporter_progressBar.Configuration.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`PartialConfiguration`](facade_implementations_progressReporter_progressBar.md#partialconfiguration)<`K`\> | Plugin configuration. |

#### Returns

`void`

___

### getConfiguration

▸ **getConfiguration**(): [`Configuration`](../interfaces/facade_implementations_progressReporter_progressBar.Configuration.md)

Returns plugin configuration.

#### Returns

[`Configuration`](../interfaces/facade_implementations_progressReporter_progressBar.Configuration.md)

Plugin configuration.
