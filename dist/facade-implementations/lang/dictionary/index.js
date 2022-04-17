"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralReduce = exports.Dictionary = exports.Definitions = void 0;
const functions_1 = require("@skylib/functions");
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
exports.pluralReduce = functions_1.o.extend((count) => {
    count = Math.abs(count);
    return count === 1 ? 1 : 2;
}, {
    /**
     * Plural reduction function for Russian language.
     *
     * @param this - No this.
     * @param count - Count.
     * @returns Reduced count.
     */
    ru(count) {
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
});
//# sourceMappingURL=index.js.map