"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImplementation = void 0;
/**
 * Creates inline search facade implementation.
 *
 * @param ctor - Inline search constructor.
 * @returns Inline search facade implementation.
 */
function createImplementation(ctor) {
    return {
        create: (idField, fields, items) => new ctor(idField, fields, items)
    };
}
exports.createImplementation = createImplementation;
//# sourceMappingURL=create-implementation.js.map