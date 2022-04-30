export { Engine } from "./Engine";
/**
 * Creates inline search facade implementation.
 *
 * @param ctor - Inline search constructor.
 * @returns Inline search facade implementation.
 */
export function createImplementation(ctor) {
    return {
        create(idField, fields, items) {
            return new ctor(idField, fields, items);
        }
    };
}
//# sourceMappingURL=index.js.map