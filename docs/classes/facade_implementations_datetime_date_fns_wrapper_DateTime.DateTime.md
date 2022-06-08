[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/datetime/date-fns-wrapper/DateTime](../modules/facade_implementations_datetime_date_fns_wrapper_DateTime.md) / DateTime

# Class: DateTime

[facade-implementations/datetime/date-fns-wrapper/DateTime](../modules/facade_implementations_datetime_date_fns_wrapper_DateTime.md).DateTime

## Implements

- `DateTime`

## Table of contents

### Constructors

- [constructor](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#constructor)

### Properties

- [value](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#value)

### Methods

- [add](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#add)
- [clone](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#clone)
- [dayOfMonth](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#dayofmonth)
- [dayOfWeek](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#dayofweek)
- [format](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#format)
- [hours](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#hours)
- [isSameDayOfMonth](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#issamedayofmonth)
- [isSameHour](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#issamehour)
- [isSameMinute](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#issameminute)
- [isSameMonth](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#issamemonth)
- [isSameYear](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#issameyear)
- [minutes](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#minutes)
- [month](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#month)
- [setDayOfMonth](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setdayofmonth)
- [setDayOfWeek](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setdayofweek)
- [setDayOfWeekLocale](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setdayofweeklocale)
- [setHours](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#sethours)
- [setMinutes](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setminutes)
- [setMonth](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setmonth)
- [setStartOfDay](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setstartofday)
- [setStartOfHour](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setstartofhour)
- [setStartOfMinute](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setstartofminute)
- [setStartOfMonth](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setstartofmonth)
- [setStartOfWeek](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setstartofweek)
- [setStartOfWeekLocale](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setstartofweeklocale)
- [setStartOfYear](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setstartofyear)
- [setYear](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#setyear)
- [sub](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#sub)
- [toDate](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#todate)
- [toString](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#tostring)
- [toTime](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#totime)
- [toTimeSec](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#totimesec)
- [year](facade_implementations_datetime_date_fns_wrapper_DateTime.DateTime.md#year)

## Constructors

### constructor

• **new DateTime**(`date?`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date?` | `NumStr` \| `Date` \| `DateTime` | Date. |

## Properties

### value

• `Protected` **value**: `Date`

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

datetime.DateTime.add

___

### clone

▸ **clone**(): `DateTime`

#### Returns

`DateTime`

#### Implementation of

datetime.DateTime.clone

___

### dayOfMonth

▸ **dayOfMonth**(): `number`

#### Returns

`number`

#### Implementation of

datetime.DateTime.dayOfMonth

___

### dayOfWeek

▸ **dayOfWeek**(): `number`

#### Returns

`number`

#### Implementation of

datetime.DateTime.dayOfWeek

___

### format

▸ **format**(`format`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |

#### Returns

`string`

#### Implementation of

datetime.DateTime.format

___

### hours

▸ **hours**(): `number`

#### Returns

`number`

#### Implementation of

datetime.DateTime.hours

___

### isSameDayOfMonth

▸ **isSameDayOfMonth**(`date`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `DateTime` |

#### Returns

`boolean`

#### Implementation of

datetime.DateTime.isSameDayOfMonth

___

### isSameHour

▸ **isSameHour**(`date`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `DateTime` |

#### Returns

`boolean`

#### Implementation of

datetime.DateTime.isSameHour

___

### isSameMinute

▸ **isSameMinute**(`date`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `DateTime` |

#### Returns

`boolean`

#### Implementation of

datetime.DateTime.isSameMinute

___

### isSameMonth

▸ **isSameMonth**(`date`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `DateTime` |

#### Returns

`boolean`

#### Implementation of

datetime.DateTime.isSameMonth

___

### isSameYear

▸ **isSameYear**(`date`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `DateTime` |

#### Returns

`boolean`

#### Implementation of

datetime.DateTime.isSameYear

___

### minutes

▸ **minutes**(): `number`

#### Returns

`number`

#### Implementation of

datetime.DateTime.minutes

___

### month

▸ **month**(): `number`

#### Returns

`number`

#### Implementation of

datetime.DateTime.month

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

datetime.DateTime.setDayOfMonth

___

### setDayOfWeek

▸ **setDayOfWeek**(`day`, `weekStartsOn`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `day` | `number` |
| `weekStartsOn` | [`FirstDayOfWeek`](../modules/facade_implementations_datetime_date_fns_wrapper_core.md#firstdayofweek) |

#### Returns

`DateTime`

#### Implementation of

datetime.DateTime.setDayOfWeek

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

datetime.DateTime.setDayOfWeekLocale

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

datetime.DateTime.setHours

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

datetime.DateTime.setMinutes

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

datetime.DateTime.setMonth

___

### setStartOfDay

▸ **setStartOfDay**(): `DateTime`

#### Returns

`DateTime`

#### Implementation of

datetime.DateTime.setStartOfDay

___

### setStartOfHour

▸ **setStartOfHour**(): `DateTime`

#### Returns

`DateTime`

#### Implementation of

datetime.DateTime.setStartOfHour

___

### setStartOfMinute

▸ **setStartOfMinute**(): `DateTime`

#### Returns

`DateTime`

#### Implementation of

datetime.DateTime.setStartOfMinute

___

### setStartOfMonth

▸ **setStartOfMonth**(): `DateTime`

#### Returns

`DateTime`

#### Implementation of

datetime.DateTime.setStartOfMonth

___

### setStartOfWeek

▸ **setStartOfWeek**(`weekStartsOn`): `DateTime`

#### Parameters

| Name | Type |
| :------ | :------ |
| `weekStartsOn` | [`FirstDayOfWeek`](../modules/facade_implementations_datetime_date_fns_wrapper_core.md#firstdayofweek) |

#### Returns

`DateTime`

#### Implementation of

datetime.DateTime.setStartOfWeek

___

### setStartOfWeekLocale

▸ **setStartOfWeekLocale**(): `DateTime`

#### Returns

`DateTime`

#### Implementation of

datetime.DateTime.setStartOfWeekLocale

___

### setStartOfYear

▸ **setStartOfYear**(): `DateTime`

#### Returns

`DateTime`

#### Implementation of

datetime.DateTime.setStartOfYear

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

datetime.DateTime.setYear

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

datetime.DateTime.sub

___

### toDate

▸ **toDate**(): `Date`

#### Returns

`Date`

#### Implementation of

datetime.DateTime.toDate

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Implementation of

datetime.DateTime.toString

___

### toTime

▸ **toTime**(): `number`

#### Returns

`number`

#### Implementation of

datetime.DateTime.toTime

___

### toTimeSec

▸ **toTimeSec**(): `number`

#### Returns

`number`

#### Implementation of

datetime.DateTime.toTimeSec

___

### year

▸ **year**(): `number`

#### Returns

`number`

#### Implementation of

datetime.DateTime.year
