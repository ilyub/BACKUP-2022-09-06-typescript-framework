[Typescript framework](../index.md) / [Exports](../modules.md) / test-utils/expect

# Module: test-utils/expect

## Table of contents

### Variables

- [matchers](test_utils_expect.md#matchers)

### Functions

- [datetimeToBe](test_utils_expect.md#datetimetobe)
- [progressToBe](test_utils_expect.md#progresstobe)

## Variables

### matchers

• `Const` **matchers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `datetimeToBe` | `ExpectFromMatcher`<``"datetimeToBe"``\> |
| `progressToBe` | `ExpectFromMatcher`<``"progressToBe"``\> |

## Functions

### datetimeToBe

▸ **datetimeToBe**(`got`, ...`args`): `Result`

Expect function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `got` | `unknown` | Got. |
| `...args` | [expected: string] | Arguments. |

#### Returns

`Result`

Result.

___

### progressToBe

▸ **progressToBe**(`got`, ...`args`): `Result`

Expect function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `got` | `unknown` | Got. |
| `...args` | [expected: number] | Arguments. |

#### Returns

`Result`

Result.
