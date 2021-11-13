[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/inlineSearch/minisearch-wrapper](../modules/facade_implementations_inlineSearch_minisearch_wrapper.md) / Engine

# Class: Engine<T\>

[facade-implementations/inlineSearch/minisearch-wrapper](../modules/facade_implementations_inlineSearch_minisearch_wrapper.md).Engine

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

## Implements

- `EngineInterface`

## Table of contents

### Constructors

- [constructor](facade_implementations_inlineSearch_minisearch_wrapper.Engine.md#constructor)

### Properties

- [minisearch](facade_implementations_inlineSearch_minisearch_wrapper.Engine.md#minisearch)

### Methods

- [search](facade_implementations_inlineSearch_minisearch_wrapper.Engine.md#search)

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
| `idField` | `string` | ID field. |
| `fields` | readonly `string`[] | Searchable fields. |
| `items` | readonly `T`[] | Items. |

## Properties

### minisearch

• `Protected` **minisearch**: `Readonly`<`MiniSearch`<`any`\>\>

## Methods

### search

▸ **search**(`query`): readonly `unknown`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

readonly `unknown`[]

#### Implementation of

EngineInterface.search
