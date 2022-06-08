[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/inline-search/core/types](../modules/facade_implementations_inline_search_core_types.md) / BuildIndex

# Interface: BuildIndex<T, I\>

[facade-implementations/inline-search/core/types](../modules/facade_implementations_inline_search_core_types.md).BuildIndex

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `I` | `I` |

## Callable

### BuildIndex

▸ **BuildIndex**(`idField`, `fields`, `items`): `I`

Builds index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idField` | `string` & keyof `T` | ID field. |
| `fields` | readonly `string` & keyof `T`[] | Searchable fields. |
| `items` | readonly `T`[] | Items. |

#### Returns

`I`
