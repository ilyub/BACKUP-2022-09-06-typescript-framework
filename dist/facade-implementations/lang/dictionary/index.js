"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralReduceRu = exports.pluralReduce = exports.Dictionary = exports.Definitions = exports.Definition = void 0;
var Definition_1 = require("./Definition");
Object.defineProperty(exports, "Definition", { enumerable: true, get: function () { return Definition_1.Definition; } });
var Definitions_1 = require("./Definitions");
Object.defineProperty(exports, "Definitions", { enumerable: true, get: function () { return Definitions_1.Definitions; } });
var Dictionary_1 = require("./Dictionary");
Object.defineProperty(exports, "Dictionary", { enumerable: true, get: function () { return Dictionary_1.Dictionary; } });
/**
 * Plural reduction function.
 *
 * @param count - Count.
 * @returns Reduced count.
 */
function pluralReduce(count) {
    count = Math.abs(count);
    return count === 1 ? 1 : 2;
}
exports.pluralReduce = pluralReduce;
/**
 * Plural reduction function for Russian language.
 *
 * @param count - Count.
 * @returns Reduced count.
 */
function pluralReduceRu(count) {
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
exports.pluralReduceRu = pluralReduceRu;
pluralReduce.ru = pluralReduceRu;
//# sourceMappingURL=index.js.map