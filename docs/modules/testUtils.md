[Typescript framework](../index.md) / [Exports](../modules.md) / testUtils

# Module: testUtils

## Table of contents

### Namespaces

- [jestReset](testUtils.jestReset.md)
- [jestSetup](testUtils.jestSetup.md)

### Functions

- [datetimeToEqual](testUtils.md#datetimetoequal)
- [jestReset](testUtils.md#jestreset)
- [jestResetDictionary](testUtils.md#jestresetdictionary)
- [jestResetDom](testUtils.md#jestresetdom)
- [jestSetup](testUtils.md#jestsetup)
- [jestSetupDictionary](testUtils.md#jestsetupdictionary)
- [jestSetupDom](testUtils.md#jestsetupdom)

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

___

### jestReset

▸ **jestReset**(): `void`

Jest reset.

#### Returns

`void`

___

### jestResetDictionary

▸ **jestResetDictionary**(`localeName`, `definitions`): `void`

Jest reset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localeName` | keyof `LocaleName` | Locale name. |
| `definitions` | `Rec`<keyof `LocaleName`, [`Definitions`](../classes/facade_implementations_lang_dictionary_Definitions.Definitions.md)\> | Language definitions. |

#### Returns

`void`

___

### jestResetDom

▸ **jestResetDom**(): `void`

Jest reset.

#### Returns

`void`

___

### jestSetup

▸ **jestSetup**(): `void`

Jest setup.

#### Returns

`void`

___

### jestSetupDictionary

▸ **jestSetupDictionary**(`localeName`, `definitions`): `void`

Jest setup.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `localeName` | keyof `LocaleName` | Locale name. |
| `definitions` | `Rec`<keyof `LocaleName`, [`Definitions`](../classes/facade_implementations_lang_dictionary_Definitions.Definitions.md)\> | Language definitions. |

#### Returns

`void`

___

### jestSetupDom

▸ **jestSetupDom**(): `void`

Jest setup.

#### Returns

`void`
