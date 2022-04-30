[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/inline-search/api/Engine](../modules/facade_implementations_inline_search_api_Engine.md) / Engine

# Class: Engine<T, I\>

[facade-implementations/inline-search/api/Engine](../modules/facade_implementations_inline_search_api_Engine.md).Engine

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `I` | `I` |

## Implements

- `Engine`<`T`\>

## Table of contents

### Constructors

- [constructor](facade_implementations_inline_search_api_Engine.Engine.md#constructor)

### Properties

- [idField](facade_implementations_inline_search_api_Engine.Engine.md#idfield)
- [index](facade_implementations_inline_search_api_Engine.Engine.md#index)
- [items](facade_implementations_inline_search_api_Engine.Engine.md#items)

### Methods

- [buildIndex](facade_implementations_inline_search_api_Engine.Engine.md#buildindex)
- [search](facade_implementations_inline_search_api_Engine.Engine.md#search)

## Constructors

### constructor

• **new Engine**<`T`, `I`\>(`idField`, `fields`, `items`)

Creates class instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `I` | `I` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idField` | `string` & keyof `T` | ID field. |
| `fields` | readonly `string` & keyof `T`[] | Searchable fields. |
| `items` | readonly `T`[] | Items. |

## Properties

### idField

• `Protected` `Readonly` **idField**: `string` & keyof `T`

___

### index

• `Protected` `Readonly` **index**: `I`

___

### items

• `Protected` `Readonly` **items**: readonly `T`[]

## Methods

### buildIndex

▸ `Protected` `Abstract` **buildIndex**(`idField`, `fields`, `items`): `I`

Builds index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idField` | `string` & keyof `T` | ID field. |
| `fields` | readonly `string` & keyof `T`[] | Searchable fields. |
| `items` | readonly `T`[] | Items. |

#### Returns

`I`

Index.

___

### search

▸ `Abstract` **search**(`query`): readonly `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

readonly `T`[]

#### Implementation of

inlineSearch.Engine.search
