[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/datetime/date-fns-wrapper/DateTime

# Module: facade-implementations/datetime/date-fns-wrapper/DateTime

## Table of contents

### Classes

- [DateTime](../classes/facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md)

### Interfaces

- [Configuration](../interfaces/facade_implementations_datetime_date_fns_wrapper_DateTime.Configuration.md)

### Type aliases

- [FirstDayOfWeek](facade_implementations_datetime_date_fns_wrapper_DateTime.md#firstdayofweek)

### Variables

- [formatStrings](facade_implementations_datetime_date_fns_wrapper_DateTime.md#formatstrings)
- [moduleConfig](facade_implementations_datetime_date_fns_wrapper_DateTime.md#moduleconfig)

### Functions

- [configure](facade_implementations_datetime_date_fns_wrapper_DateTime.md#configure)
- [getConfiguration](facade_implementations_datetime_date_fns_wrapper_DateTime.md#getconfiguration)

## Type aliases

### FirstDayOfWeek

Ƭ **FirstDayOfWeek**: ``0`` \| ``1``

## Variables

### formatStrings

• `Const` **formatStrings**: `strings`

___

### moduleConfig

• `Const` **moduleConfig**: [`Configuration`](../interfaces/facade_implementations_datetime_date_fns_wrapper_DateTime.Configuration.md)

## Functions

### configure

▸ **configure**(`config`): `void`

Configures plugin.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`<[`Configuration`](../interfaces/facade_implementations_datetime_date_fns_wrapper_DateTime.Configuration.md)\> | Plugin configuration. |

#### Returns

`void`

___

### getConfiguration

▸ **getConfiguration**(): [`Configuration`](../interfaces/facade_implementations_datetime_date_fns_wrapper_DateTime.Configuration.md)

Returns plugin configuration.

#### Returns

[`Configuration`](../interfaces/facade_implementations_datetime_date_fns_wrapper_DateTime.Configuration.md)

Plugin configuration.
