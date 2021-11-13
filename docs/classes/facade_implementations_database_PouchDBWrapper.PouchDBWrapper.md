[Typescript framework](../index.md) / [Exports](../modules.md) / [facade-implementations/database/PouchDBWrapper](../modules/facade_implementations_database_PouchDBWrapper.md) / PouchDBWrapper

# Class: PouchDBWrapper

[facade-implementations/database/PouchDBWrapper](../modules/facade_implementations_database_PouchDBWrapper.md).PouchDBWrapper

## Implements

- `Facade`

## Table of contents

### Constructors

- [constructor](facade_implementations_database_PouchDBWrapper.PouchDBWrapper.md#constructor)

### Properties

- [config](facade_implementations_database_PouchDBWrapper.PouchDBWrapper.md#config)
- [pouchConfig](facade_implementations_database_PouchDBWrapper.PouchDBWrapper.md#pouchconfig)

### Methods

- [create](facade_implementations_database_PouchDBWrapper.PouchDBWrapper.md#create)

## Constructors

### constructor

• **new PouchDBWrapper**(`config?`, `pouchConfig?`)

Creates class instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`Configuration`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.Configuration.md) | Configuration. |
| `pouchConfig` | [`PouchDatabaseConfiguration`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabaseconfiguration) | PouchDB configuration. |

## Properties

### config

• `Protected` **config**: [`Configuration`](../interfaces/facade_implementations_database_PouchDBWrapper_Database.Configuration.md)

___

### pouchConfig

• `Protected` **pouchConfig**: [`PouchDatabaseConfiguration`](../modules/facade_implementations_database_PouchDBWrapper_PouchDBProxy.md#pouchdatabaseconfiguration)

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

Facade.create
