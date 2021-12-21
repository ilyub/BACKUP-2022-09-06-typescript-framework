import naturalCompare from "natural-compare";
import * as fn from "@skylib/functions/es/function";
export const implementation = fn.run(() => {
    function compare(x, y) {
        if (x > y)
            return 1;
        if (x < y)
            return -1;
        return 0;
    }
    compare.strings = naturalCompare;
    return compare;
});
//# sourceMappingURL=natural-compare-wrapper.js.map