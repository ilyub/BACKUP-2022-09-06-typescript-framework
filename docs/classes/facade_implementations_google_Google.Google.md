[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/google/Google](../modules/facade_implementations_google_Google.md) / Google

# Class: Google

[facade-implementations/google/Google](../modules/facade_implementations_google_Google.md).Google

## Implements

- `Facade`

## Table of contents

### Constructors

- [constructor](facade_implementations_google_Google.Google.md#constructor)

### Properties

- [clientId](facade_implementations_google_Google.Google.md#clientid)
- [sdk](facade_implementations_google_Google.Google.md#sdk)

### Methods

- [idToken](facade_implementations_google_Google.Google.md#idtoken)
- [loadSdk](facade_implementations_google_Google.Google.md#loadsdk)

## Constructors

### constructor

• **new Google**(`clientId`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientId` | `stringU` \| `AsyncPromise`<`stringU`, `nevers`\> | Client ID. |

## Properties

### clientId

• `Protected` **clientId**: `stringU` \| `AsyncPromise`<`stringU`, `nevers`\>

___

### sdk

• `Protected` **sdk**: `undefined` \| `Promise`<[`GoogleAuth`](../modules/facade_implementations_google_Google.md#googleauth)\> = `undefined`

## Methods

### idToken

▸ **idToken**(): `Promise`<`stringU`\>

#### Returns

`Promise`<`stringU`\>

#### Implementation of

Facade.idToken

___

### loadSdk

▸ **loadSdk**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

Facade.loadSdk
