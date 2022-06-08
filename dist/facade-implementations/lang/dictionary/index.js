"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguration = exports.configure = exports.pluralReduce = exports.Dictionary = exports.Definitions = void 0;
var Definitions_1 = require("./Definitions");
Object.defineProperty(exports, "Definitions", { enumerable: true, get: function () { return Definitions_1.Definitions; } });
var Dictionary_1 = require("./Dictionary");
Object.defineProperty(exports, "Dictionary", { enumerable: true, get: function () { return Dictionary_1.Dictionary; } });
// eslint-disable-next-line no-restricted-syntax -- Ok
var core_1 = require("./core");
Object.defineProperty(exports, "pluralReduce", { enumerable: true, get: function () { return core_1.pluralReduce; } });
Object.defineProperty(exports, "configure", { enumerable: true, get: function () { return core_1.configure; } });
Object.defineProperty(exports, "getConfiguration", { enumerable: true, get: function () { return core_1.getConfiguration; } });
//# sourceMappingURL=index.js.map