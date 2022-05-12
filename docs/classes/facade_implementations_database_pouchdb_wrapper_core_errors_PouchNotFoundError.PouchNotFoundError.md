[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/core/errors/PouchNotFoundError](../modules/facade_implementations_database_pouchdb_wrapper_core_errors_PouchNotFoundError.md) / PouchNotFoundError

# Class: PouchNotFoundError

[facade-implementations/database/pouchdb-wrapper/core/errors/PouchNotFoundError](../modules/facade_implementations_database_pouchdb_wrapper_core_errors_PouchNotFoundError.md).PouchNotFoundError

## Hierarchy

- `Error`

  ↳ **`PouchNotFoundError`**

## Table of contents

### Constructors

- [constructor](facade_implementations_database_pouchdb_wrapper_core_errors_PouchNotFoundError.PouchNotFoundError.md#constructor)

### Properties

- [message](facade_implementations_database_pouchdb_wrapper_core_errors_PouchNotFoundError.PouchNotFoundError.md#message)
- [name](facade_implementations_database_pouchdb_wrapper_core_errors_PouchNotFoundError.PouchNotFoundError.md#name)
- [stack](facade_implementations_database_pouchdb_wrapper_core_errors_PouchNotFoundError.PouchNotFoundError.md#stack)
- [stackTraceLimit](facade_implementations_database_pouchdb_wrapper_core_errors_PouchNotFoundError.PouchNotFoundError.md#stacktracelimit)

### Methods

- [captureStackTrace](facade_implementations_database_pouchdb_wrapper_core_errors_PouchNotFoundError.PouchNotFoundError.md#capturestacktrace)
- [prepareStackTrace](facade_implementations_database_pouchdb_wrapper_core_errors_PouchNotFoundError.PouchNotFoundError.md#preparestacktrace)

## Constructors

### constructor

• **new PouchNotFoundError**(`message`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Message. |

#### Overrides

Error.constructor

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

___

### name

• `Readonly` **name**: ``"PouchNotFoundError"``

#### Overrides

Error.name

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

___

### prepareStackTrace

▸ `Static` `Optional` **prepareStackTrace**(`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

#### Returns

`any`

#### Inherited from

Error.prepareStackTrace
