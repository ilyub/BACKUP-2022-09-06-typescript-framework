[Typescript framework](../index.md) / [Exports](../modules.md) / testUtils

# Module: testUtils

## Table of contents

### Variables

- [jestReset](testUtils.md#jestreset)
- [jestSetup](testUtils.md#jestsetup)

### Functions

- [datetimeToEqual](testUtils.md#datetimetoequal)

## Variables

### jestReset

• `Const` **jestReset**: { `dictionary`: (`this`: `void`, `localeName`: keyof `LocaleName`, `definitions`: `Rec`<keyof `LocaleName`, [`Definitions`](../classes/facade_implementations_lang_dictionary_Definitions.Definitions.md)\>) => `void` ; `dom`: (`this`: `void`) => `void`  } & () => `void`

Jest reset.

___

### jestSetup

• `Const` **jestSetup**: { `dictionary`: (`this`: `void`, `localeName`: keyof `LocaleName`, `definitions`: `Rec`<keyof `LocaleName`, [`Definitions`](../classes/facade_implementations_lang_dictionary_Definitions.Definitions.md)\>) => `void` ; `dom`: (`this`: `void`) => `void`  } & () => `void`

Jest setup.

## Functions

### datetimeToEqual

▸ **datetimeToEqual**(`got`, `expected`): `testUtils.ExpectReturnType`

Checks that datetime equals expected value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `got` | `unknown` | Got value. |
| `expected` | `string` | Expected value. |

#### Returns

`testUtils.ExpectReturnType`

Result object.
