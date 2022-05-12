[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/pouchdb-wrapper/PouchWrapper](../modules/facade_implementations_database_pouchdb_wrapper_PouchWrapper.md) / PouchWrapper

# Class: PouchWrapper

[facade-implementations/database/pouchdb-wrapper/PouchWrapper](../modules/facade_implementations_database_pouchdb_wrapper_PouchWrapper.md).PouchWrapper

## Implements

- `Facade`

## Table of contents

### Constructors

- [constructor](facade_implementations_database_pouchdb_wrapper_PouchWrapper.PouchWrapper.md#constructor)

### Properties

- [config](facade_implementations_database_pouchdb_wrapper_PouchWrapper.PouchWrapper.md#config)
- [pouchConfig](facade_implementations_database_pouchdb_wrapper_PouchWrapper.PouchWrapper.md#pouchconfig)
- [PouchConflictError](facade_implementations_database_pouchdb_wrapper_PouchWrapper.PouchWrapper.md#pouchconflicterror)
- [PouchNotFoundError](facade_implementations_database_pouchdb_wrapper_PouchWrapper.PouchWrapper.md#pouchnotfounderror)
- [PouchRetryError](facade_implementations_database_pouchdb_wrapper_PouchWrapper.PouchWrapper.md#pouchretryerror)

### Methods

- [create](facade_implementations_database_pouchdb_wrapper_PouchWrapper.PouchWrapper.md#create)

## Constructors

### constructor

• **new PouchWrapper**(`config?`, `pouchConfig?`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`Configuration`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.Configuration.md) | Configuration. |
| `pouchConfig` | `DatabaseConfiguration` | PouchDB configuration. |

## Properties

### config

• `Protected` `Readonly` **config**: [`Configuration`](../interfaces/facade_implementations_database_pouchdb_wrapper_core_types_misc.Configuration.md)

___

### pouchConfig

• `Protected` `Readonly` **pouchConfig**: `DatabaseConfiguration`

___

### PouchConflictError

▪ `Static` `Readonly` **PouchConflictError**: typeof [`PouchConflictError`](facade_implementations_database_pouchdb_wrapper_core_errors_PouchConflictError.PouchConflictError.md) = `PouchConflictError`

___

### PouchNotFoundError

▪ `Static` `Readonly` **PouchNotFoundError**: typeof [`PouchNotFoundError`](facade_implementations_database_pouchdb_wrapper_core_errors_PouchNotFoundError.PouchNotFoundError.md) = `PouchNotFoundError`

___

### PouchRetryError

▪ `Static` `Readonly` **PouchRetryError**: typeof [`PouchRetryError`](facade_implementations_database_pouchdb_wrapper_core_errors_PouchRetryError.PouchRetryError.md) = `PouchRetryError`

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
