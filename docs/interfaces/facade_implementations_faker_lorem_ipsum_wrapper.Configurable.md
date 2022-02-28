[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/faker/lorem-ipsum-wrapper](../modules/facade_implementations_faker_lorem_ipsum_wrapper.md) / Configurable

# Interface: Configurable

[facade-implementations/faker/lorem-ipsum-wrapper](../modules/facade_implementations_faker_lorem_ipsum_wrapper.md).Configurable

## Table of contents

### Methods

- [configure](facade_implementations_faker_lorem_ipsum_wrapper.Configurable.md#configure)
- [getConfiguration](facade_implementations_faker_lorem_ipsum_wrapper.Configurable.md#getconfiguration)

## Methods

### configure

▸ `Readonly` **configure**<`K`\>(`config`): `void`

Configures plugin.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`Configuration`](facade_implementations_faker_lorem_ipsum_wrapper.Configuration.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`PartialConfiguration`](../modules/facade_implementations_faker_lorem_ipsum_wrapper.md#partialconfiguration)<`K`\> | Plugin configuration. |

#### Returns

`void`

___

### getConfiguration

▸ `Readonly` **getConfiguration**(): [`Configuration`](facade_implementations_faker_lorem_ipsum_wrapper.Configuration.md)

Returns plugin configuration.

#### Returns

[`Configuration`](facade_implementations_faker_lorem_ipsum_wrapper.Configuration.md)

Plugin configuration.
