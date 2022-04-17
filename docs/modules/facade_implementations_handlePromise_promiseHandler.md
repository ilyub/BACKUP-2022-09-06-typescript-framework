[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/handlePromise/promiseHandler

# Module: facade-implementations/handlePromise/promiseHandler

## Table of contents

### Interfaces

- [Configuration](../interfaces/facade_implementations_handlePromise_promiseHandler.Configuration.md)

### Type aliases

- [PartialConfiguration](facade_implementations_handlePromise_promiseHandler.md#partialconfiguration)

### Variables

- [handlers](facade_implementations_handlePromise_promiseHandler.md#handlers)
- [implementation](facade_implementations_handlePromise_promiseHandler.md#implementation)

### Functions

- [configure](facade_implementations_handlePromise_promiseHandler.md#configure)
- [getConfiguration](facade_implementations_handlePromise_promiseHandler.md#getconfiguration)

## Type aliases

### PartialConfiguration

Ƭ **PartialConfiguration**<`K`\>: { readonly [L in K]: Configuration[L] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`Configuration`](../interfaces/facade_implementations_handlePromise_promiseHandler.Configuration.md) |

## Variables

### handlers

• `Const` **handlers**: `Readonly`<{ `error`: (`error`: `unknown`) => `void`  }\>

___

### implementation

• `Const` **implementation**: `handlePromise.Facade`

## Functions

### configure

▸ **configure**(`config`): `void`

Configures plugin.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`<[`Configuration`](../interfaces/facade_implementations_handlePromise_promiseHandler.Configuration.md)\> | Plugin configuration. |

#### Returns

`void`

___

### getConfiguration

▸ **getConfiguration**(): [`Configuration`](../interfaces/facade_implementations_handlePromise_promiseHandler.Configuration.md)

Returns plugin configuration.

#### Returns

[`Configuration`](../interfaces/facade_implementations_handlePromise_promiseHandler.Configuration.md)

Plugin configuration.
