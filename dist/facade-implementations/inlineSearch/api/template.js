"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = exports.createImplementation = void 0;
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
class Engine {
    /**
     * Creates class instance.
     *
     * @param idField - ID field.
     * @param fields - Searchable fields.
     * @param items - Items.
     */
    constructor(idField, fields, items) {
        Object.defineProperty(this, "idField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "items", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.idField = idField;
        this.items = items;
        this.index = this.buildIndex(idField, fields, items);
    }
}
exports.Engine = Engine;
//# sourceMappingURL=template.js.map