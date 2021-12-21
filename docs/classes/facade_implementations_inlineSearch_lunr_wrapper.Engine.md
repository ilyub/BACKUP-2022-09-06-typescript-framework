[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/inlineSearch/lunr-wrapper](../modules/facade_implementations_inlineSearch_lunr_wrapper.md) / Engine

# Class: Engine<T\>

[facade-implementations/inlineSearch/lunr-wrapper](../modules/facade_implementations_inlineSearch_lunr_wrapper.md).Engine

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

## Implements

- `EngineInterface`<`T`\>

## Table of contents

### Constructors

- [constructor](facade_implementations_inlineSearch_lunr_wrapper.Engine.md#constructor)

### Properties

- [idField](facade_implementations_inlineSearch_lunr_wrapper.Engine.md#idfield)
- [index](facade_implementations_inlineSearch_lunr_wrapper.Engine.md#index)
- [items](facade_implementations_inlineSearch_lunr_wrapper.Engine.md#items)

### Methods

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
| `idField` | keyof `T` & `string` | ID field. |
| `fields` | readonly keyof `T` & `string`[] | Searchable fields. |
| `items` | readonly `T`[] | Items. |

## Properties

### idField

• `Protected` **idField**: keyof `T` & `string`

___

### index

• `Protected` **index**: `Index`

___

### items

• `Protected` **items**: readonly `T`[]

## Methods

### search

▸ **search**(`query`): readonly `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

readonly `T`[]

#### Implementation of

EngineInterface.search
