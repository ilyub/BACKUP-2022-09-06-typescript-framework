[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/testDelay/configurableTestDelay

# Module: facade-implementations/testDelay/configurableTestDelay

## Table of contents

### Interfaces

- [Configuration](../interfaces/facade_implementations_testDelay_configurableTestDelay.Configuration.md)

### Type aliases

- [PartialConfiguration](facade_implementations_testDelay_configurableTestDelay.md#partialconfiguration)

### Variables

- [moduleConfig](facade_implementations_testDelay_configurableTestDelay.md#moduleconfig)

### Functions

- [configure](facade_implementations_testDelay_configurableTestDelay.md#configure)
- [getConfiguration](facade_implementations_testDelay_configurableTestDelay.md#getconfiguration)
- [implementation](facade_implementations_testDelay_configurableTestDelay.md#implementation)

## Type aliases

### PartialConfiguration

Ƭ **PartialConfiguration**<`K`\>: { readonly [L in K]: Configuration[L] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`Configuration`](../interfaces/facade_implementations_testDelay_configurableTestDelay.Configuration.md) |

## Variables

### moduleConfig

• **moduleConfig**: [`Configuration`](../interfaces/facade_implementations_testDelay_configurableTestDelay.Configuration.md)

## Functions

### configure

▸ **configure**<`K`\>(`config`): `void`

Configures plugin.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`Configuration`](../interfaces/facade_implementations_testDelay_configurableTestDelay.Configuration.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`PartialConfiguration`](facade_implementations_testDelay_configurableTestDelay.md#partialconfiguration)<`K`\> | Plugin configuration. |

#### Returns

`void`

___

### getConfiguration

▸ **getConfiguration**(): [`Configuration`](../interfaces/facade_implementations_testDelay_configurableTestDelay.Configuration.md)

Returns plugin configuration.

#### Returns

[`Configuration`](../interfaces/facade_implementations_testDelay_configurableTestDelay.Configuration.md)

Plugin configuration.

___

### implementation

▸ `Const` **implementation**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
