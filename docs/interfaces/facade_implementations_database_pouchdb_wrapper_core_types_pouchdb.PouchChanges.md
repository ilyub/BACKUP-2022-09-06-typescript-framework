[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md) / PouchChanges

# Interface: PouchChanges

[facade-implementations/database/pouchdb-wrapper/core/types/pouchdb](../modules/facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.md).PouchChanges

## Hierarchy

- `Changes`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>

  ↳ **`PouchChanges`**

## Table of contents

### Properties

- [[toStringTag]](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#[tostringtag])

### Methods

- [addListener](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#addlistener)
- [cancel](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#cancel)
- [catch](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#catch)
- [emit](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#emit)
- [eventNames](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#eventnames)
- [finally](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#finally)
- [getMaxListeners](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#getmaxlisteners)
- [listenerCount](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#listenercount)
- [listeners](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#listeners)
- [on](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#on)
- [once](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#once)
- [prependListener](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#prependlistener)
- [prependOnceListener](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#prependoncelistener)
- [removeAllListeners](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#removealllisteners)
- [removeListener](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#removelistener)
- [setMaxListeners](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#setmaxlisteners)
- [then](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md#then)

## Properties

### [toStringTag]

• `Readonly` **[toStringTag]**: `string`

#### Inherited from

PouchDB.Core.Changes.\_\_@toStringTag@5714

## Methods

### addListener

▸ **addListener**(`event`, `listener`): [`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Inherited from

PouchDB.Core.Changes.addListener

___

### cancel

▸ **cancel**(): `void`

#### Returns

`void`

#### Inherited from

PouchDB.Core.Changes.cancel

___

### catch

▸ **catch**<`TResult`\>(`onrejected?`): `Promise`<`ChangesResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\> \| `TResult`\>

Attaches a callback for only the rejection of the Promise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onrejected?` | ``null`` \| (`reason`: `any`) => `TResult` \| `PromiseLike`<`TResult`\> | The callback to execute when the Promise is rejected. |

#### Returns

`Promise`<`ChangesResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\> \| `TResult`\>

A Promise for the completion of the callback.

#### Inherited from

PouchDB.Core.Changes.catch

___

### emit

▸ **emit**(`event`, ...`args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

PouchDB.Core.Changes.emit

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

PouchDB.Core.Changes.eventNames

___

### finally

▸ **finally**(`onfinally?`): `Promise`<`ChangesResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\>

Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
resolved value cannot be modified from the callback.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onfinally?` | ``null`` \| () => `void` | The callback to execute when the Promise is settled (fulfilled or rejected). |

#### Returns

`Promise`<`ChangesResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>\>

A Promise for the completion of the callback.

#### Inherited from

PouchDB.Core.Changes.finally

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

PouchDB.Core.Changes.getMaxListeners

___

### listenerCount

▸ **listenerCount**(`type`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` \| `symbol` |

#### Returns

`number`

#### Inherited from

PouchDB.Core.Changes.listenerCount

___

### listeners

▸ **listeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

PouchDB.Core.Changes.listeners

___

### on

▸ **on**(`event`, `listener`): [`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"change"`` |
| `listener` | (`value`: `ChangesResponseChange`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>) => `any` |

#### Returns

[`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Inherited from

PouchDB.Core.Changes.on

▸ **on**(`event`, `listener`): [`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"complete"`` |
| `listener` | (`value`: `ChangesResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>) => `any` |

#### Returns

[`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Inherited from

PouchDB.Core.Changes.on

▸ **on**(`event`, `listener`): [`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`value`: `any`) => `any` |

#### Returns

[`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Inherited from

PouchDB.Core.Changes.on

___

### once

▸ **once**(`event`, `listener`): [`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Inherited from

PouchDB.Core.Changes.once

___

### prependListener

▸ **prependListener**(`event`, `listener`): [`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Inherited from

PouchDB.Core.Changes.prependListener

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Inherited from

PouchDB.Core.Changes.prependOnceListener

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Inherited from

PouchDB.Core.Changes.removeAllListeners

___

### removeListener

▸ **removeListener**(`event`, `listener`): [`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | `Function` |

#### Returns

[`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Inherited from

PouchDB.Core.Changes.removeListener

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`PouchChanges`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.PouchChanges.md)

#### Inherited from

PouchDB.Core.Changes.setMaxListeners

___

### then

▸ **then**<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): `Promise`<`TResult1` \| `TResult2`\>

Attaches callbacks for the resolution and/or rejection of the Promise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult1` | `ChangesResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\> |
| `TResult2` | `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onfulfilled?` | ``null`` \| (`value`: `ChangesResponse`<[`Content`](facade_implementations_database_pouchdb_wrapper_core_types_pouchdb.Content.md)\>) => `TResult1` \| `PromiseLike`<`TResult1`\> | The callback to execute when the Promise is resolved. |
| `onrejected?` | ``null`` \| (`reason`: `any`) => `TResult2` \| `PromiseLike`<`TResult2`\> | The callback to execute when the Promise is rejected. |

#### Returns

`Promise`<`TResult1` \| `TResult2`\>

A Promise for the completion of which ever callback is executed.

#### Inherited from

PouchDB.Core.Changes.then
