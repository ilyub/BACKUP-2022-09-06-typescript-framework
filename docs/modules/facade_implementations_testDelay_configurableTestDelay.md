[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/testDelay/configurableTestDelay

# Module: facade-implementations/testDelay/configurableTestDelay

## Table of contents

### Interfaces

- [Configuration](../interfaces/facade_implementations_testDelay_configurableTestDelay.Configuration.md)

### Variables

- [moduleConfig](facade_implementations_testDelay_configurableTestDelay.md#moduleconfig)

### Functions

- [configure](facade_implementations_testDelay_configurableTestDelay.md#configure)
- [getConfiguration](facade_implementations_testDelay_configurableTestDelay.md#getconfiguration)
- [implementation](facade_implementations_testDelay_configurableTestDelay.md#implementation)

## Variables

### moduleConfig

• `Const` **moduleConfig**: [`Configuration`](../interfaces/facade_implementations_testDelay_configurableTestDelay.Configuration.md)

## Functions

### configure

▸ **configure**(`config`): `void`

Configures plugin.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`<[`Configuration`](../interfaces/facade_implementations_testDelay_configurableTestDelay.Configuration.md)\> | Plugin configuration. |

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

▸ **implementation**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
