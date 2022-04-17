export { Engine } from "./Engine";
/**
 * Creates search engine.
 *
 * @param ctor - Search engine constructor.
 * @returns Search engine.
 */
export function createImplementation(ctor) {
    return {
        create(idField, fields, items) {
            return new ctor(idField, fields, items);
        }
    };
}
//# sourceMappingURL=index.js.map