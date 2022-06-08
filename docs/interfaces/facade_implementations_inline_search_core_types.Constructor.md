[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/inline-search/core/types](../modules/facade_implementations_inline_search_core_types.md) / Constructor

# Interface: Constructor

[facade-implementations/inline-search/core/types](../modules/facade_implementations_inline_search_core_types.md).Constructor

## Table of contents

### Constructors

- [constructor](facade_implementations_inline_search_core_types.Constructor.md#constructor)

## Constructors

### constructor

• **new Constructor**<`T`\>(`idField`, `fields`, `items`)

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
