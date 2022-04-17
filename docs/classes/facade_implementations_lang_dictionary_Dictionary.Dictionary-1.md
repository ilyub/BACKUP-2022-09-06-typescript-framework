[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/lang/dictionary/Dictionary](../modules/facade_implementations_lang_dictionary_Dictionary.md) / Dictionary

# Class: Dictionary

[facade-implementations/lang/dictionary/Dictionary](../modules/facade_implementations_lang_dictionary_Dictionary.md).Dictionary

## Implements

- `Dictionary`<`lang.Context`\>

## Table of contents

### Constructors

- [constructor](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#constructor)

### Properties

- [\_context](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#_context)
- [count](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#count)
- [definitions](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#definitions)
- [proxified](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#proxified)
- [subsPool](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#subspool)

### Methods

- [context](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#context)
- [get](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#get)
- [has](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#has)
- [plural](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#plural)
- [pluralReduce](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#pluralreduce)
- [with](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#with)
- [configure](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#configure)
- [create](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#create)
- [getConfiguration](facade_implementations_lang_dictionary_Dictionary.Dictionary-1.md#getconfiguration)

## Constructors

### constructor

• `Protected` **new Dictionary**(`definitions`, `context?`, `count?`)

Creates class instance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `definitions` | `Rec`<`LocaleName`, [`Definitions`](facade_implementations_lang_dictionary_Definitions.Definitions.md)\> | `undefined` | Language definitions. |
| `context?` | ``"InXDays"`` | `undefined` | Context. |
| `count` | `number` | `1` | Count for plural form. |

## Properties

### \_context

• `Protected` `Readonly` **\_context**: `undefined` \| ``"InXDays"``

___

### count

• `Protected` `Readonly` **count**: `number`

___

### definitions

• `Protected` `Readonly` **definitions**: `Rec`<`LocaleName`, [`Definitions`](facade_implementations_lang_dictionary_Definitions.Definitions.md)\>

___

### proxified

• `Protected` `Readonly` **proxified**: `Facade`

___

### subsPool

• `Protected` `Readonly` **subsPool**: `Map`<`NumStr`, `Facade`\>

## Methods

### context

▸ **context**(`context`): `Facade`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | ``"InXDays"`` |

#### Returns

`Facade`

#### Implementation of

lang.Dictionary.context

___

### get

▸ **get**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Implementation of

lang.Dictionary.get

___

### has

▸ **has**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Implementation of

lang.Dictionary.has

___

### plural

▸ **plural**(`count`): `Facade`

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

`Facade`

#### Implementation of

lang.Dictionary.plural

___

### pluralReduce

▸ `Protected` **pluralReduce**(`count`): `number`

Reduces count for plural word form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | Count. |

#### Returns

`number`

Reduced count.

___

### with

▸ **with**(`search`, `replace`): `Facade`

#### Parameters

| Name | Type |
| :------ | :------ |
| `search` | `string` |
| `replace` | `NumStr` |

#### Returns

`Facade`

#### Implementation of

lang.Dictionary.with

___

### configure

▸ `Static` **configure**(`config`): `void`

Configures plugin.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`<[`Configuration`](../interfaces/facade_implementations_lang_dictionary_Dictionary.Dictionary.Configuration.md)\> | Plugin configuration. |

#### Returns

`void`

___

### create

▸ `Static` **create**(`definitions`, `context?`, `count?`): `Facade`

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `definitions` | `Rec`<`LocaleName`, [`Definitions`](facade_implementations_lang_dictionary_Definitions.Definitions.md)\> | Language definitions. |
| `context?` | ``"InXDays"`` | Context. |
| `count?` | `number` | Count for plural form. |

#### Returns

`Facade`

Dictionary.

___

### getConfiguration

▸ `Static` **getConfiguration**(): [`Configuration`](../interfaces/facade_implementations_lang_dictionary_Dictionary.Dictionary.Configuration.md)

Returns plugin configuration.

#### Returns

[`Configuration`](../interfaces/facade_implementations_lang_dictionary_Dictionary.Dictionary.Configuration.md)

Plugin configuration.
