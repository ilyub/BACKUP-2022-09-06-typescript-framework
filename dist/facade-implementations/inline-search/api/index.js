"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImplementation = exports.Engine = void 0;
var Engine_1 = require("./Engine");
Object.defineProperty(exports, "Engine", { enumerable: true, get: function () { return Engine_1.Engine; } });
/**
 * Creates inline search facade implementation.
 *
 * @param ctor - Inline search constructor.
 * @returns Inline search facade implementation.
 */
function createImplementation(ctor) {
    return {
        create(idField, fields, items) {
            return new ctor(idField, fields, items);
        }
    };
}
exports.createImplementation = createImplementation;
//# sourceMappingURL=index.js.map