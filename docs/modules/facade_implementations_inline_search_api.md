[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/inline-search/api

# Module: facade-implementations/inline-search/api

## Table of contents

### References

- [Engine](facade_implementations_inline_search_api.md#engine)

### Type aliases

- [Constructor](facade_implementations_inline_search_api.md#constructor)

### Functions

- [createImplementation](facade_implementations_inline_search_api.md#createimplementation)

## References

### Engine

Re-exports [Engine](../classes/facade_implementations_inline_search_api_Engine.Engine.md)

## Type aliases

### Constructor

Ƭ **Constructor**: <T\>(`idField`: `string` & keyof `T`, `fields`: `ReadonlyArray`<`string` & keyof `T`\>, `items`: readonly `T`[]) => `inlineSearch.Engine`<`T`\>

#### Type declaration

• <`T`\>(`idField`, `fields`, `items`)

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `idField` | `string` & keyof `T` |
| `fields` | `ReadonlyArray`<`string` & keyof `T`\> |
| `items` | readonly `T`[] |

## Functions

### createImplementation

▸ **createImplementation**(`ctor`): `inlineSearch.Facade`

Creates inline search facade implementation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctor` | [`Constructor`](facade_implementations_inline_search_api.md#constructor) | Inline search constructor. |

#### Returns

`inlineSearch.Facade`

Inline search facade implementation.
