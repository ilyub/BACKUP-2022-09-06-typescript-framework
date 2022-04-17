[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/inlineSearch/api

# Module: facade-implementations/inlineSearch/api

## Table of contents

### References

- [Engine](facade_implementations_inlineSearch_api.md#engine)

### Type aliases

- [Constructor](facade_implementations_inlineSearch_api.md#constructor)

### Functions

- [createImplementation](facade_implementations_inlineSearch_api.md#createimplementation)

## References

### Engine

Re-exports [Engine](../classes/facade_implementations_inlineSearch_api_Engine.Engine.md)

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

Creates search engine.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctor` | [`Constructor`](facade_implementations_inlineSearch_api.md#constructor) | Search engine constructor. |

#### Returns

`inlineSearch.Facade`

Search engine.
