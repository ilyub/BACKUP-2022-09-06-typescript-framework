[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/lang/dictionary/Definition](../modules/facade_implementations_lang_dictionary_Definition.md) / Definition

# Class: Definition

[facade-implementations/lang/dictionary/Definition](../modules/facade_implementations_lang_dictionary_Definition.md).Definition

## Table of contents

### Constructors

- [constructor](facade_implementations_lang_dictionary_Definition.Definition.md#constructor)

### Properties

- [contexts](facade_implementations_lang_dictionary_Definition.Definition.md#contexts)
- [id](facade_implementations_lang_dictionary_Definition.Definition.md#id)
- [rulesRef](facade_implementations_lang_dictionary_Definition.Definition.md#rulesref)
- [rulesRefDependent](facade_implementations_lang_dictionary_Definition.Definition.md#rulesrefdependent)
- [rulesRefSecondary](facade_implementations_lang_dictionary_Definition.Definition.md#rulesrefsecondary)
- [rulesVal](facade_implementations_lang_dictionary_Definition.Definition.md#rulesval)
- [rulesWord](facade_implementations_lang_dictionary_Definition.Definition.md#rulesword)
- [rulesWordSecondary](facade_implementations_lang_dictionary_Definition.Definition.md#ruleswordsecondary)
- [sub](facade_implementations_lang_dictionary_Definition.Definition.md#sub)
- [subs](facade_implementations_lang_dictionary_Definition.Definition.md#subs)
- [value](facade_implementations_lang_dictionary_Definition.Definition.md#value)

### Methods

- [applyRulesRef](facade_implementations_lang_dictionary_Definition.Definition.md#applyrulesref)
- [applyRulesRefDependent](facade_implementations_lang_dictionary_Definition.Definition.md#applyrulesrefdependent)
- [applyRulesRefSecondary](facade_implementations_lang_dictionary_Definition.Definition.md#applyrulesrefsecondary)
- [applyRulesVal](facade_implementations_lang_dictionary_Definition.Definition.md#applyrulesval)
- [applyRulesWord](facade_implementations_lang_dictionary_Definition.Definition.md#applyrulesword)
- [applyRulesWordSecondary](facade_implementations_lang_dictionary_Definition.Definition.md#applyruleswordsecondary)
- [get](facade_implementations_lang_dictionary_Definition.Definition.md#get)

## Constructors

### constructor

• **new Definition**(`raw`, `id`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `raw` | [`RawDefinition`](../modules/facade_implementations_lang_dictionary_types.md#rawdefinition) | Raw definition. |
| `id` | `string` | ID. |

## Properties

### contexts

• `Protected` **contexts**: `Readonly`<`IndexedObject`<`NumStr`\>\> = `{}`

___

### id

• `Protected` **id**: `string`

___

### rulesRef

• `Protected` **rulesRef**: readonly `strings`[]

___

### rulesRefDependent

• `Protected` **rulesRefDependent**: readonly `strings`[]

___

### rulesRefSecondary

• `Protected` **rulesRefSecondary**: readonly `strings`[]

___

### rulesVal

• `Protected` **rulesVal**: readonly `strings`[]

___

### rulesWord

• `Protected` **rulesWord**: readonly `strings`[]

___

### rulesWordSecondary

• `Protected` **rulesWordSecondary**: readonly `strings`[]

___

### sub

• `Protected` **sub**: `undefined` \| [`Definition`](facade_implementations_lang_dictionary_Definition.Definition.md) = `undefined`

___

### subs

• `Protected` **subs**: `Readonly`<`IndexedObject`<[`Definition`](facade_implementations_lang_dictionary_Definition.Definition.md)\>\> = `{}`

___

### value

• `Protected` **value**: `string`

## Methods

### applyRulesRef

▸ `Protected` **applyRulesRef**(`word`, `owner`): [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Applies rules to the word.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `word` | [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md) | Word. |
| `owner` | [`Definitions`](facade_implementations_lang_dictionary_Definitions.Definitions.md) | Parent object. |

#### Returns

[`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Modified word.

___

### applyRulesRefDependent

▸ `Protected` **applyRulesRefDependent**(`word`, `owner`): [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Applies rules to the word.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `word` | [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md) | Word. |
| `owner` | [`Definitions`](facade_implementations_lang_dictionary_Definitions.Definitions.md) | Parent object. |

#### Returns

[`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Modified word.

___

### applyRulesRefSecondary

▸ `Protected` **applyRulesRefSecondary**(`word`, `owner`): [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Applies rules to the word.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `word` | [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md) | Word. |
| `owner` | [`Definitions`](facade_implementations_lang_dictionary_Definitions.Definitions.md) | Parent object. |

#### Returns

[`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Modified word.

___

### applyRulesVal

▸ `Protected` **applyRulesVal**(`word`): [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Applies rules to the word.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `word` | [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md) | Word. |

#### Returns

[`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Modified word.

___

### applyRulesWord

▸ `Protected` **applyRulesWord**(`word`, `owner`): [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Applies rules to the word.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `word` | [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md) | Word. |
| `owner` | [`Definitions`](facade_implementations_lang_dictionary_Definitions.Definitions.md) | Parent object. |

#### Returns

[`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Modified word.

___

### applyRulesWordSecondary

▸ `Protected` **applyRulesWordSecondary**(`word`, `owner`): [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Applies rules to the word.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `word` | [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md) | Word. |
| `owner` | [`Definitions`](facade_implementations_lang_dictionary_Definitions.Definitions.md) | Parent object. |

#### Returns

[`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Modified word.

___

### get

▸ **get**(`owner`, `context`, `forms`, `count`, `replacements`): [`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Returns word based on context, word forms, and count.
Applies replacements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`Definitions`](facade_implementations_lang_dictionary_Definitions.Definitions.md) | Parent object. |
| `context` | `undefined` \| ``"InXDays"`` | Context. |
| `forms` | `strings` | Word form. |
| `count` | `number` | Count for plural form. |
| `replacements` | `ReadonlyMap`<`string`, `string`\> | Replacements. |

#### Returns

[`WordInfo`](../interfaces/facade_implementations_lang_dictionary_types.WordInfo.md)

Word.
