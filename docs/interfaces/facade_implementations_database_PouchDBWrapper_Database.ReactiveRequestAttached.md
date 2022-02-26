[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/PouchDBWrapper/Database](../modules/facade_implementations_database_PouchDBWrapper_Database.md) / ReactiveRequestAttached

# Interface: ReactiveRequestAttached<T\>

[facade-implementations/database/PouchDBWrapper/Database](../modules/facade_implementations_database_PouchDBWrapper_Database.md).ReactiveRequestAttached

## Type parameters

| Name |
| :------ |
| `T` |

## Callable

### ReactiveRequestAttached

▸ **ReactiveRequestAttached**(`conditions?`, `parentConditions?`, `options?`): `Promise`<`T`\>

Reactive request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conditions?` | `Readonly`<`Record`<`string`, `Condition`\>\> | Conditions. |
| `parentConditions?` | `Readonly`<`Record`<`string`, `Condition`\>\> | Parent conditions. |
| `options?` | `QueryOptions` | Options. |

#### Returns

`Promise`<`T`\>

Promise.
