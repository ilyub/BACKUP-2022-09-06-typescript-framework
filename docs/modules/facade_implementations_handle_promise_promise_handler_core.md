[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/handle-promise/promise-handler/core

# Module: facade-implementations/handle-promise/promise-handler/core

## Table of contents

### Interfaces

- [Configurable](../interfaces/facade_implementations_handle_promise_promise_handler_core.Configurable.md)
- [Configuration](../interfaces/facade_implementations_handle_promise_promise_handler_core.Configuration.md)
- [PartialConfiguration](../interfaces/facade_implementations_handle_promise_promise_handler_core.PartialConfiguration.md)

### Variables

- [moduleConfig](facade_implementations_handle_promise_promise_handler_core.md#moduleconfig)
- [promises](facade_implementations_handle_promise_promise_handler_core.md#promises)

### Functions

- [handle](facade_implementations_handle_promise_promise_handler_core.md#handle)

## Variables

### moduleConfig

• `Const` **moduleConfig**: `Writable`<[`Configuration`](../interfaces/facade_implementations_handle_promise_promise_handler_core.Configuration.md)\>

___

### promises

• `Const` **promises**: `Map`<`symbol`, `Promise`<`unknown`\>\>

## Functions

### handle

▸ **handle**<`T`\>(`mixed`, `type`, `errorMessage`): `void`

Handles promise.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mixed` | `AsyncPromise`<`T`, `nevers`\> | Promise or async function. |
| `type` | `undefined` \| `PromiseType` | Type (determines expected duration for progress reporting). |
| `errorMessage` | `string` | Error message (used to alert user on error). |

#### Returns

`void`
