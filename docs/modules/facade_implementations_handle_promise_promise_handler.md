[Typescript framework](../index.md) / [Exports](../modules.md) / facade-implementations/handle-promise/promise-handler

# Module: facade-implementations/handle-promise/promise-handler

## Table of contents

### Namespaces

- [promiseHandler](facade_implementations_handle_promise_promise_handler.promiseHandler.md)

### Functions

- [promiseHandler](facade_implementations_handle_promise_promise_handler.md#promisehandler)

## Functions

### promiseHandler

▸ **promiseHandler**<`T`\>(`type`, `mixed`, `errorMessage?`): `void`

Handles promise with progress reporting.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `undefined` \| `PromiseType` | Type (determines expected duration for progress reporting). |
| `mixed` | `AsyncPromise`<`T`, `nevers`\> | Promise or async function. |
| `errorMessage?` | `string` | Error message (used to alert user on error). |

#### Returns

`void`
