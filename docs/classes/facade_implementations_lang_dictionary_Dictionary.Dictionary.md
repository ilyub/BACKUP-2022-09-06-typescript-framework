[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/lang/dictionary/Dictionary](../modules/facade_implementations_lang_dictionary_Dictionary.md) / Dictionary

# Class: Dictionary

[facade-implementations/lang/dictionary/Dictionary](../modules/facade_implementations_lang_dictionary_Dictionary.md).Dictionary

## Implements

- `Dictionary`<`lang.Word`, `lang.Context`\>

## Table of contents

### Constructors

- [constructor](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#constructor)

### Properties

- [\_context](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#_context)
- [count](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#count)
- [definitions](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#definitions)
- [facade](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#facade)
- [keys](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#keys)
- [subs](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#subs)

### Methods

- [context](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#context)
- [get](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#get)
- [getIfExists](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#getifexists)
- [has](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#has)
- [plural](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#plural)
- [pluralReduce](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#pluralreduce)
- [with](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#with)
- [create](facade_implementations_lang_dictionary_Dictionary.Dictionary.md#create)

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

### facade

• `Protected` `Readonly` **facade**: `Facade`

___

### keys

• `Readonly` **keys**: `Rec`<`Transform`<`Word`\>, `Transform`<`Word`\>\>

#### Implementation of

lang.Dictionary.keys

___

### subs

• `Protected` `Readonly` **subs**: `Map`<`NumStr`, `Facade`\>

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
| `key` | `Transform`<`Word`\> |

#### Returns

`string`

#### Implementation of

lang.Dictionary.get

___

### getIfExists

▸ **getIfExists**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Implementation of

lang.Dictionary.getIfExists

___

### has

▸ **has**(`key`): key is Transform<Word\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

key is Transform<Word\>

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

Reduces count for plural form.

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

### create

▸ `Static` **create**(`definitions`, `context?`, `count?`): `Facade`

Creates dictionary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `definitions` | `Rec`<`LocaleName`, [`Definitions`](facade_implementations_lang_dictionary_Definitions.Definitions.md)\> | Language definitions. |
| `context?` | ``"InXDays"`` | Context. |
| `count?` | `number` | Count for plural form. |

#### Returns

`Facade`

Dictionary.
