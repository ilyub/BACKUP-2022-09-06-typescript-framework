"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyObjectWrapper = void 0;
const tslib_1 = require("tslib");
const stringify_object_1 = tslib_1.__importDefault(require("stringify-object"));
const stringifyObjectWrapper = value => (0, stringify_object_1.default)(value, { indent: "  " });
exports.stringifyObjectWrapper = stringifyObjectWrapper;
//# sourceMappingURL=stringify-object-wrapper.js.map