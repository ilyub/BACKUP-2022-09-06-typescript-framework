[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/inlineSearch/api/template](../modules/facade_implementations_inlineSearch_api_template.md) / Engine

# Class: Engine<T, I\>

[facade-implementations/inlineSearch/api/template](../modules/facade_implementations_inlineSearch_api_template.md).Engine

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `I` | `I` |

## Hierarchy

- **`Engine`**

  ↳ [`Engine`](facade_implementations_inlineSearch_lunr_wrapper.Engine.md)

  ↳ [`Engine`](facade_implementations_inlineSearch_minisearch_wrapper.Engine.md)

## Implements

- `Engine`<`T`\>

## Table of contents

### Constructors

- [constructor](facade_implementations_inlineSearch_api_template.Engine.md#constructor)

### Properties

- [idField](facade_implementations_inlineSearch_api_template.Engine.md#idfield)
- [index](facade_implementations_inlineSearch_api_template.Engine.md#index)
- [items](facade_implementations_inlineSearch_api_template.Engine.md#items)

### Methods

- [buildIndex](facade_implementations_inlineSearch_api_template.Engine.md#buildindex)
- [search](facade_implementations_inlineSearch_api_template.Engine.md#search)

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

• `Protected` **idField**: `string` & keyof `T`

___

### index

• `Protected` **index**: `I`

___

### items

• `Protected` **items**: readonly `T`[]

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

EngineInterface.search
