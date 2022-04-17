"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImplementation = exports.Engine = void 0;
var Engine_1 = require("./Engine");
Object.defineProperty(exports, "Engine", { enumerable: true, get: function () { return Engine_1.Engine; } });
/**
 * Creates search engine.
 *
 * @param ctor - Search engine constructor.
 * @returns Search engine.
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