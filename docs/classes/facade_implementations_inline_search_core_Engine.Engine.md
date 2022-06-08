[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/inline-search/core/Engine](../modules/facade_implementations_inline_search_core_Engine.md) / Engine

# Class: Engine<T, I\>

[facade-implementations/inline-search/core/Engine](../modules/facade_implementations_inline_search_core_Engine.md).Engine

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `I` | `I` |

## Implements

- `Engine`<`T`\>

## Table of contents

### Constructors

- [constructor](facade_implementations_inline_search_core_Engine.Engine.md#constructor)

### Properties

- [idField](facade_implementations_inline_search_core_Engine.Engine.md#idfield)
- [index](facade_implementations_inline_search_core_Engine.Engine.md#index)
- [items](facade_implementations_inline_search_core_Engine.Engine.md#items)

### Methods

- [search](facade_implementations_inline_search_core_Engine.Engine.md#search)

## Constructors

### constructor

• **new Engine**<`T`, `I`\>(`idField`, `fields`, `items`, `buildIndex`)

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
| `buildIndex` | [`BuildIndex`](../interfaces/facade_implementations_inline_search_core_types.BuildIndex.md)<`T`, `I`\> | Index builder. |

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
