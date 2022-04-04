[Typescript framework](../index.md) / [Exports](../modules.md) / [testUtils](testUtils.md) / jestSetup

# Namespace: jestSetup

[testUtils](testUtils.md).jestSetup

## Table of contents

### Variables

- [dictionary](testUtils.jestSetup.md#dictionary)
- [dom](testUtils.jestSetup.md#dom)

## Variables

### dictionary

• **dictionary**: (`localeName`: keyof `LocaleName`, `definitions`: `Rec`<keyof `LocaleName`, [`Definitions`](../classes/facade_implementations_lang_dictionary_Definitions.Definitions.md)\>) => `void`

#### Type declaration

▸ (`localeName`, `definitions`): `void`

Jest setup.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localeName` | keyof `LocaleName` | Locale name. |
| `definitions` | `Rec`<keyof `LocaleName`, [`Definitions`](../classes/facade_implementations_lang_dictionary_Definitions.Definitions.md)\> | Language definitions. |

##### Returns

`void`

___

### dom

• **dom**: () => `void`

#### Type declaration

▸ (): `void`

Jest setup.

##### Returns

`void`
