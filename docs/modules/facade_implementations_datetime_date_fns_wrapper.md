[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/datetime/date-fns-wrapper

# Module: facade-implementations/datetime/date-fns-wrapper

## Table of contents

### Classes

- [DateTime](../classes/facade_implementations_datetime_date_fns_wrapper.DateTime.md)

### Interfaces

- [Configuration](../interfaces/facade_implementations_datetime_date_fns_wrapper.Configuration.md)

### Type aliases

- [FirstDayOfWeek](facade_implementations_datetime_date_fns_wrapper.md#firstdayofweek)
- [PartialConfiguration](facade_implementations_datetime_date_fns_wrapper.md#partialconfiguration)

### Variables

- [implementation](facade_implementations_datetime_date_fns_wrapper.md#implementation)

### Functions

- [configure](facade_implementations_datetime_date_fns_wrapper.md#configure)
- [getConfiguration](facade_implementations_datetime_date_fns_wrapper.md#getconfiguration)

## Type aliases

### FirstDayOfWeek

Ƭ **FirstDayOfWeek**: ``0`` \| ``1``

___

### PartialConfiguration

Ƭ **PartialConfiguration**<`K`\>: { readonly [L in K]: Configuration[L] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`Configuration`](../interfaces/facade_implementations_datetime_date_fns_wrapper.Configuration.md) |

## Variables

### implementation

• `Const` **implementation**: `Facade`

## Functions

### configure

▸ **configure**<`K`\>(`config`): `void`

Configures plugin.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`Configuration`](../interfaces/facade_implementations_datetime_date_fns_wrapper.Configuration.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`PartialConfiguration`](facade_implementations_datetime_date_fns_wrapper.md#partialconfiguration)<`K`\> | Plugin configuration. |

#### Returns

`void`

___

### getConfiguration

▸ **getConfiguration**(): [`Configuration`](../interfaces/facade_implementations_datetime_date_fns_wrapper.Configuration.md)

Returns plugin configuration.

#### Returns

[`Configuration`](../interfaces/facade_implementations_datetime_date_fns_wrapper.Configuration.md)

Plugin configuration.
