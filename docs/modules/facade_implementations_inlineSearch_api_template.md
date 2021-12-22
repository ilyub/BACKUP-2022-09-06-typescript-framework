[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/inlineSearch/api/template

# Module: facade-implementations/inlineSearch/api/template

## Table of contents

### Classes

- [Engine](../classes/facade_implementations_inlineSearch_api_template.Engine.md)

### Type aliases

- [Constructor](facade_implementations_inlineSearch_api_template.md#constructor)

### Functions

- [createImplementation](facade_implementations_inlineSearch_api_template.md#createimplementation)

## Type aliases

### Constructor

Ƭ **Constructor**: <T\>(`idField`: keyof `T` & `string`, `fields`: `ReadonlyArray`<keyof `T` & `string`\>, `items`: readonly `T`[]) => `EngineInterface`<`T`\>

#### Type declaration

• <`T`\>(`idField`, `fields`, `items`)

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `idField` | keyof `T` & `string` |
| `fields` | `ReadonlyArray`<keyof `T` & `string`\> |
| `items` | readonly `T`[] |

## Functions

### createImplementation

▸ **createImplementation**(`ctor`): `Facade`

Creates search engine.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctor` | [`Constructor`](facade_implementations_inlineSearch_api_template.md#constructor) | Search engine constructor. |

#### Returns

`Facade`

Search engine.
