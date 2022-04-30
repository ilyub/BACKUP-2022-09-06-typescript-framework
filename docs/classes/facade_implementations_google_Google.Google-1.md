[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/google/Google](../modules/facade_implementations_google_Google.md) / Google

# Class: Google

[facade-implementations/google/Google](../modules/facade_implementations_google_Google.md).Google

## Implements

- `Facade`

## Table of contents

### Constructors

- [constructor](facade_implementations_google_Google.Google-1.md#constructor)

### Properties

- [clientId](facade_implementations_google_Google.Google-1.md#clientid)
- [sdk](facade_implementations_google_Google.Google-1.md#sdk)

### Methods

- [\_loadSdk](facade_implementations_google_Google.Google-1.md#_loadsdk)
- [idToken](facade_implementations_google_Google.Google-1.md#idtoken)
- [loadSdk](facade_implementations_google_Google.Google-1.md#loadsdk)

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

• `Protected` `Readonly` **clientId**: `stringU` \| `AsyncPromise`<`stringU`, `nevers`\>

___

### sdk

• `Protected` **sdk**: `undefined` \| `Promise`<[`Auth`](../interfaces/facade_implementations_google_Google.Google.Auth.md)\>

## Methods

### \_loadSdk

▸ `Protected` **_loadSdk**(): `Promise`<[`Auth`](../interfaces/facade_implementations_google_Google.Google.Auth.md)\>

Loads SDK.

#### Returns

`Promise`<[`Auth`](../interfaces/facade_implementations_google_Google.Google.Auth.md)\>

SDK.

___

### idToken

▸ **idToken**(): `Promise`<`stringU`\>

#### Returns

`Promise`<`stringU`\>

#### Implementation of

google.Facade.idToken

___

### loadSdk

▸ **loadSdk**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

google.Facade.loadSdk
