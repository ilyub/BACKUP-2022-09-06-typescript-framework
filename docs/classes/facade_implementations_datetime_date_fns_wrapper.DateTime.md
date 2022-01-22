[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/datetime/date-fns-wrapper](../modules/facade_implementations_datetime_date_fns_wrapper.md) / DateTime

# Class: DateTime

[facade-implementations/datetime/date-fns-wrapper](../modules/facade_implementations_datetime_date_fns_wrapper.md).DateTime

## Implements

- `DateTime`

## Table of contents

### Constructors

- [constructor](facade_implementations_datetime_date_fns_wrapper.DateTime.md#constructor)

### Properties

- [value](facade_implementations_datetime_date_fns_wrapper.DateTime.md#value)

### Methods

- [add](facade_implementations_datetime_date_fns_wrapper.DateTime.md#add)
- [clone](facade_implementations_datetime_date_fns_wrapper.DateTime.md#clone)
- [dayOfMonth](facade_implementations_datetime_date_fns_wrapper.DateTime.md#dayofmonth)
- [dayOfWeek](facade_implementations_datetime_date_fns_wrapper.DateTime.md#dayofweek)
- [format](facade_implementations_datetime_date_fns_wrapper.DateTime.md#format)
- [hours](facade_implementations_datetime_date_fns_wrapper.DateTime.md#hours)
- [isSameDayOfMonth](facade_implementations_datetime_date_fns_wrapper.DateTime.md#issamedayofmonth)
- [isSameHour](facade_implementations_datetime_date_fns_wrapper.DateTime.md#issamehour)
- [isSameMinute](facade_implementations_datetime_date_fns_wrapper.DateTime.md#issameminute)
- [isSameMonth](facade_implementations_datetime_date_fns_wrapper.DateTime.md#issamemonth)
- [isSameYear](facade_implementations_datetime_date_fns_wrapper.DateTime.md#issameyear)
- [minutes](facade_implementations_datetime_date_fns_wrapper.DateTime.md#minutes)
- [month](facade_implementations_datetime_date_fns_wrapper.DateTime.md#month)
- [setDayOfMonth](facade_implementations_datetime_date_fns_wrapper.DateTime.md#setdayofmonth)
- [setDayOfWeek](facade_implementations_datetime_date_fns_wrapper.DateTime.md#setdayofweek)
- [setDayOfWeekLocale](facade_implementations_datetime_date_fns_wrapper.DateTime.md#setdayofweeklocale)
- [setHours](facade_implementations_datetime_date_fns_wrapper.DateTime.md#sethours)
- [setMinutes](facade_implementations_datetime_date_fns_wrapper.DateTime.md#setminutes)
- [setMonth](facade_implementations_datetime_date_fns_wrapper.DateTime.md#setmonth)
- [setStartOfWeek](facade_implementations_datetime_date_fns_wrapper.DateTime.md#setstartofweek)
- [setStartOfWeekLocale](facade_implementations_datetime_date_fns_wrapper.DateTime.md#setstartofweeklocale)
- [setYear](facade_implementations_datetime_date_fns_wrapper.DateTime.md#setyear)
- [sub](facade_implementations_datetime_date_fns_wrapper.DateTime.md#sub)
- [toDate](facade_implementations_datetime_date_fns_wrapper.DateTime.md#todate)
- [toString](facade_implementations_datetime_date_fns_wrapper.DateTime.md#tostring)
- [toTime](facade_implementations_datetime_date_fns_wrapper.DateTime.md#totime)
- [year](facade_implementations_datetime_date_fns_wrapper.DateTime.md#year)

## Constructors

### constructor

• **new DateTime**(`dt?`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dt?` | `string` \| `DateTime` | Date/time. |

## Properties

### value

• `Protected` **value**: `Readonly`<`Date`\>

## Methods

### add

▸ **add**(`amount`, `unit`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `number` |
| `unit` | `Unit` |

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.add

___

### clone

▸ **clone**(): `DateTime`

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.clone

___

### dayOfMonth

▸ **dayOfMonth**(): `number`

#### Returns

`number`

#### Implementation of

DateTimeInterface.dayOfMonth

___

### dayOfWeek

▸ **dayOfWeek**(): `number`

#### Returns

`number`

#### Implementation of

DateTimeInterface.dayOfWeek

___

### format

▸ **format**(`fmt`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fmt` | `string` |

#### Returns

`string`

#### Implementation of

DateTimeInterface.format

___

### hours

▸ **hours**(): `number`

#### Returns

`number`

#### Implementation of

DateTimeInterface.hours

___

### isSameDayOfMonth

▸ **isSameDayOfMonth**(`dt`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dt` | `DateTime` |

#### Returns

`boolean`

#### Implementation of

DateTimeInterface.isSameDayOfMonth

___

### isSameHour

▸ **isSameHour**(`dt`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dt` | `DateTime` |

#### Returns

`boolean`

#### Implementation of

DateTimeInterface.isSameHour

___

### isSameMinute

▸ **isSameMinute**(`dt`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dt` | `DateTime` |

#### Returns

`boolean`

#### Implementation of

DateTimeInterface.isSameMinute

___

### isSameMonth

▸ **isSameMonth**(`dt`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dt` | `DateTime` |

#### Returns

`boolean`

#### Implementation of

DateTimeInterface.isSameMonth

___

### isSameYear

▸ **isSameYear**(`dt`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dt` | `DateTime` |

#### Returns

`boolean`

#### Implementation of

DateTimeInterface.isSameYear

___

### minutes

▸ **minutes**(): `number`

#### Returns

`number`

#### Implementation of

DateTimeInterface.minutes

___

### month

▸ **month**(): `number`

#### Returns

`number`

#### Implementation of

DateTimeInterface.month

___

### setDayOfMonth

▸ **setDayOfMonth**(`day`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `day` | `number` |

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.setDayOfMonth

___

### setDayOfWeek

▸ **setDayOfWeek**(`day`, `weekStartsOn`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `day` | `number` |
| `weekStartsOn` | [`FirstDayOfWeek`](../modules/facade_implementations_datetime_date_fns_wrapper.md#firstdayofweek) |

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.setDayOfWeek

___

### setDayOfWeekLocale

▸ **setDayOfWeekLocale**(`day`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `day` | `number` |

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.setDayOfWeekLocale

___

### setHours

▸ **setHours**(`hours`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hours` | `number` |

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.setHours

___

### setMinutes

▸ **setMinutes**(`minutes`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `minutes` | `number` |

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.setMinutes

___

### setMonth

▸ **setMonth**(`month`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `month` | `number` |

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.setMonth

___

### setStartOfWeek

▸ **setStartOfWeek**(`weekStartsOn`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `weekStartsOn` | [`FirstDayOfWeek`](../modules/facade_implementations_datetime_date_fns_wrapper.md#firstdayofweek) |

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.setStartOfWeek

___

### setStartOfWeekLocale

▸ **setStartOfWeekLocale**(): `DateTime`

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.setStartOfWeekLocale

___

### setYear

▸ **setYear**(`year`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `year` | `number` |

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.setYear

___

### sub

▸ **sub**(`amount`, `unit`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `number` |
| `unit` | `Unit` |

#### Returns

`DateTime`

#### Implementation of

DateTimeInterface.sub

___

### toDate

▸ **toDate**(): `Readonly`<`Date`\>

#### Returns

`Readonly`<`Date`\>

#### Implementation of

DateTimeInterface.toDate

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Implementation of

DateTimeInterface.toString

___

### toTime

▸ **toTime**(): `number`

#### Returns

`number`

#### Implementation of

DateTimeInterface.toTime

___

### year

▸ **year**(): `number`

#### Returns

`number`

#### Implementation of

DateTimeInterface.year
