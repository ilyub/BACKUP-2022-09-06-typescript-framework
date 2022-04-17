[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/facebook/Facebook](../modules/facade_implementations_facebook_Facebook.md) / Facebook

# Class: Facebook

[facade-implementations/facebook/Facebook](../modules/facade_implementations_facebook_Facebook.md).Facebook

## Implements

- `Facade`

## Table of contents

### Constructors

- [constructor](facade_implementations_facebook_Facebook.Facebook.md#constructor)

### Properties

- [appId](facade_implementations_facebook_Facebook.Facebook.md#appid)
- [sdk](facade_implementations_facebook_Facebook.Facebook.md#sdk)
- [version](facade_implementations_facebook_Facebook.Facebook.md#version)

### Methods

- [accessToken](facade_implementations_facebook_Facebook.Facebook.md#accesstoken)
- [loadSdk](facade_implementations_facebook_Facebook.Facebook.md#loadsdk)

## Constructors

### constructor

• **new Facebook**(`appId`, `version`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appId` | `stringU` \| `AsyncPromise`<`stringU`, `nevers`\> | Facebook app ID. |
| `version` | `string` | Version. |

## Properties

### appId

• `Protected` `Readonly` **appId**: `stringU` \| `AsyncPromise`<`stringU`, `nevers`\>

___

### sdk

• `Protected` **sdk**: `undefined` \| `Promise`<`void`\> = `undefined`

___

### version

• `Protected` `Readonly` **version**: `string`

## Methods

### accessToken

▸ **accessToken**(): `Promise`<`stringU`\>

#### Returns

`Promise`<`stringU`\>

#### Implementation of

facebook.Facade.accessToken

___

### loadSdk

▸ **loadSdk**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

facebook.Facade.loadSdk
