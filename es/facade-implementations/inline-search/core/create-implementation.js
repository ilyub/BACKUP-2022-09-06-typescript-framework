/**
 * Creates inline search facade implementation.
 *
 * @param ctor - Inline search constructor.
 * @returns Inline search facade implementation.
 */
export function createImplementation(ctor) {
    return {
        create: (idField, fields, items) => new ctor(idField, fields, items)
    };
}
//# sourceMappingURL=create-implementation.js.map