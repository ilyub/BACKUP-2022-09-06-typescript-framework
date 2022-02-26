[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/inlineSearch/lunr-wrapper](../modules/facade_implementations_inlineSearch_lunr_wrapper.md) / Engine

# Class: Engine<T\>

[facade-implementations/inlineSearch/lunr-wrapper](../modules/facade_implementations_inlineSearch_lunr_wrapper.md).Engine

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

## Hierarchy

- [`Engine`](facade_implementations_inlineSearch_api_template.Engine.md)<`T`, `lunr.Index`\>

  ↳ **`Engine`**

## Table of contents

### Constructors

- [constructor](facade_implementations_inlineSearch_lunr_wrapper.Engine.md#constructor)

### Properties

- [idField](facade_implementations_inlineSearch_lunr_wrapper.Engine.md#idfield)
- [index](facade_implementations_inlineSearch_lunr_wrapper.Engine.md#index)
- [items](facade_implementations_inlineSearch_lunr_wrapper.Engine.md#items)

### Methods

- [buildIndex](facade_implementations_inlineSearch_lunr_wrapper.Engine.md#buildindex)
- [search](facade_implementations_inlineSearch_lunr_wrapper.Engine.md#search)

## Constructors

### constructor

• **new Engine**<`T`\>(`idField`, `fields`, `items`)

Creates class instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idField` | `string` & keyof `T` | ID field. |
| `fields` | readonly `string` & keyof `T`[] | Searchable fields. |
| `items` | readonly `T`[] | Items. |

#### Inherited from

[Engine](facade_implementations_inlineSearch_api_template.Engine.md).[constructor](facade_implementations_inlineSearch_api_template.Engine.md#constructor)

## Properties

### idField

• `Protected` **idField**: `string` & keyof `T`

#### Inherited from

[Engine](facade_implementations_inlineSearch_api_template.Engine.md).[idField](facade_implementations_inlineSearch_api_template.Engine.md#idfield)

___

### index

• `Protected` **index**: `Index`

#### Inherited from

[Engine](facade_implementations_inlineSearch_api_template.Engine.md).[index](facade_implementations_inlineSearch_api_template.Engine.md#index)

___

### items

• `Protected` **items**: readonly `T`[]

#### Inherited from

[Engine](facade_implementations_inlineSearch_api_template.Engine.md).[items](facade_implementations_inlineSearch_api_template.Engine.md#items)

## Methods

### buildIndex

▸ `Protected` **buildIndex**(`idField`, `fields`, `items`): `Index`

Builds index.

#### Parameters

| Name | Type |
| :------ | :------ |
| `idField` | `string` & keyof `T` |
| `fields` | readonly `string` & keyof `T`[] |
| `items` | readonly `T`[] |

#### Returns

`Index`

Index.

#### Overrides

[Engine](facade_implementations_inlineSearch_api_template.Engine.md).[buildIndex](facade_implementations_inlineSearch_api_template.Engine.md#buildindex)

___

### search

▸ **search**(`query`): readonly `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

readonly `T`[]

#### Overrides

[Engine](facade_implementations_inlineSearch_api_template.Engine.md).[search](facade_implementations_inlineSearch_api_template.Engine.md#search)
