[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/PouchDBWrapper/PouchDBWrapper](../modules/facade_implementations_database_PouchDBWrapper_PouchDBWrapper.md) / PouchDBWrapper

# Class: PouchDBWrapper

[facade-implementations/database/PouchDBWrapper/PouchDBWrapper](../modules/facade_implementations_database_PouchDBWrapper_PouchDBWrapper.md).PouchDBWrapper

## Implements

- `Facade`

## Table of contents

### Constructors

- [constructor](facade_implementations_database_PouchDBWrapper_PouchDBWrapper.PouchDBWrapper.md#constructor)

### Properties

- [config](facade_implementations_database_PouchDBWrapper_PouchDBWrapper.PouchDBWrapper.md#config)
- [pouchConfig](facade_implementations_database_PouchDBWrapper_PouchDBWrapper.PouchDBWrapper.md#pouchconfig)
- [PouchConflictError](facade_implementations_database_PouchDBWrapper_PouchDBWrapper.PouchDBWrapper.md#pouchconflicterror)
- [PouchNotFoundError](facade_implementations_database_PouchDBWrapper_PouchDBWrapper.PouchDBWrapper.md#pouchnotfounderror)
- [PouchRetryError](facade_implementations_database_PouchDBWrapper_PouchDBWrapper.PouchDBWrapper.md#pouchretryerror)

### Methods

- [create](facade_implementations_database_PouchDBWrapper_PouchDBWrapper.PouchDBWrapper.md#create)

## Constructors

### constructor

• **new PouchDBWrapper**(`config?`, `pouchConfig?`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`Configuration`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.Configuration.md) | Configuration. |
| `pouchConfig` | `DatabaseConfiguration` | PouchDB configuration. |

## Properties

### config

• `Protected` `Readonly` **config**: [`Configuration`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.Configuration.md)

___

### pouchConfig

• `Protected` `Readonly` **pouchConfig**: `DatabaseConfiguration`

___

### PouchConflictError

▪ `Static` `Readonly` **PouchConflictError**: typeof [`PouchConflictError`](facade_implementations_database_PouchDBWrapper_errors_PouchConflictError.PouchConflictError.md) = `PouchConflictError`

___

### PouchNotFoundError

▪ `Static` `Readonly` **PouchNotFoundError**: typeof [`PouchNotFoundError`](facade_implementations_database_PouchDBWrapper_errors_PouchNotFoundError.PouchNotFoundError.md) = `PouchNotFoundError`

___

### PouchRetryError

▪ `Static` `Readonly` **PouchRetryError**: typeof [`PouchRetryError`](facade_implementations_database_PouchDBWrapper_errors_PouchRetryError.PouchRetryError.md) = `PouchRetryError`

## Methods

### create

▸ **create**(`name`, `options?`): `Database`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `DatabaseOptions` |

#### Returns

`Database`

#### Implementation of

database.Facade.create
