export { Definition } from "./Definition";
export { Definitions } from "./Definitions";
export { Dictionary } from "./Dictionary";
/**
 * Plural reduction function.
 *
 * @param count - Count.
 * @returns Reduced count.
 */
export function pluralReduce(count) {
    count = Math.abs(count);
    return count === 1 ? 1 : 2;
}
/**
 * Plural reduction function for Russian language.
 *
 * @param count - Count.
 * @returns Reduced count.
 */
export function pluralReduceRu(count) {
    count = Math.abs(count);
    if (count >= 10 && count <= 19)
        return 5;
    if (count % 10 === 1)
        return 1;
    if (count % 10 === 2)
        return 2;
    if (count % 10 === 3)
        return 2;
    if (count % 10 === 4)
        return 2;
    return 5;
}
pluralReduce.ru = pluralReduceRu;
//# sourceMappingURL=index.js.map