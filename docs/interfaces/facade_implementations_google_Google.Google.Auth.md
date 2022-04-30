[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/google/Google](../modules/facade_implementations_google_Google.md) / [Google](../modules/facade_implementations_google_Google.Google.md) / Auth

# Interface: Auth

[facade-implementations/google/Google](../modules/facade_implementations_google_Google.md).[Google](../modules/facade_implementations_google_Google.Google.md).Auth

## Hierarchy

- `Omit`<`gapi.auth2.GoogleAuth`, ``"then"``\>

  ↳ **`Auth`**

## Table of contents

### Properties

- [currentUser](facade_implementations_google_Google.Google.Auth.md#currentuser)
- [isSignedIn](facade_implementations_google_Google.Google.Auth.md#issignedin)

### Methods

- [attachClickHandler](facade_implementations_google_Google.Google.Auth.md#attachclickhandler)
- [disconnect](facade_implementations_google_Google.Google.Auth.md#disconnect)
- [grantOfflineAccess](facade_implementations_google_Google.Google.Auth.md#grantofflineaccess)
- [signIn](facade_implementations_google_Google.Google.Auth.md#signin)
- [signOut](facade_implementations_google_Google.Google.Auth.md#signout)

## Properties

### currentUser

• **currentUser**: `CurrentUser`

#### Inherited from

Omit.currentUser

___

### isSignedIn

• **isSignedIn**: `IsSignedIn`

#### Inherited from

Omit.isSignedIn

## Methods

### attachClickHandler

▸ **attachClickHandler**(`container`, `options`, `onsuccess`, `onfailure`): `any`

Attaches the sign-in flow to the specified container's click handler.

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `any` |
| `options` | `SigninOptions` |
| `onsuccess` | (`googleUser`: `GoogleUser`) => `any` |
| `onfailure` | (`reason`: `string`) => `any` |

#### Returns

`any`

#### Inherited from

Omit.attachClickHandler

___

### disconnect

▸ **disconnect**(): `any`

Revokes all of the scopes that the user granted.

#### Returns

`any`

#### Inherited from

Omit.disconnect

___

### grantOfflineAccess

▸ **grantOfflineAccess**(`options?`): `Promise`<{ `code`: `string`  }\>

Get permission from the user to access the specified scopes offline.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `OfflineAccessOptions` |

#### Returns

`Promise`<{ `code`: `string`  }\>

#### Inherited from

Omit.grantOfflineAccess

___

### signIn

▸ **signIn**(`options?`): `Promise`<`GoogleUser`\>

Signs in the user using the specified options.
If no option specified here, fallback to the options specified to gapi.auth2.init().

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `SigninOptions` \| `SigninOptionsBuilder` |

#### Returns

`Promise`<`GoogleUser`\>

#### Inherited from

Omit.signIn

___

### signOut

▸ **signOut**(): `any`

Signs out all accounts from the application.

#### Returns

`any`

#### Inherited from

Omit.signOut
