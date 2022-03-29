[Typescript framework](../index.md) / [Exports](../modules.md) / configs/eslintrc.options

# Module: configs/eslintrc.options

## Table of contents

### Namespaces

- [export&#x3D;](configs_eslintrc_options.export_.md)

### Properties

- [export&#x3D;](configs_eslintrc_options.md#export&#x3D;)

## Properties

### export&#x3D;

• **export=**: (`importPrefix`: `any`) => { `consistentImport`: ({ `altLocalNames`: `never` ; `autoImportSource`: `string` ; `sourcePattern`: `string` = "@skylib/framework/*/facade-implementations/compare/natural-compare-wrapper"; `type`: `string` = "wildcard" } \| { `altLocalNames`: `string`[] ; `autoImportSource`: `string` ; `sourcePattern`: `string` = "@skylib/framework/*/plugins/shortcuts"; `type`: `string` = "wildcard" })[]  }

#### Type declaration

▸ (`importPrefix`): `Object`

Returns ESLint options.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `importPrefix` | `any` | Import prefix. |

##### Returns

`Object`

ESLint options.

| Name | Type |
| :------ | :------ |
| `consistentImport` | ({ `altLocalNames`: `never` ; `autoImportSource`: `string` ; `sourcePattern`: `string` = "@skylib/framework/*/facade-implementations/compare/natural-compare-wrapper"; `type`: `string` = "wildcard" } \| { `altLocalNames`: `string`[] ; `autoImportSource`: `string` ; `sourcePattern`: `string` = "@skylib/framework/*/plugins/shortcuts"; `type`: `string` = "wildcard" })[] |
