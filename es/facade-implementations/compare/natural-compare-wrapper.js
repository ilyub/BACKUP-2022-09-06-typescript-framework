import naturalCompare from "natural-compare";
import * as fn from "@skylib/functions/es/function";
export const implementation = fn.run(() => {
    function compare(x, y) {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        if (x > y)
            return 1;
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        if (x < y)
            return -1;
        return 0;
    }
    compare.strings = naturalCompare;
    return compare;
});
//# sourceMappingURL=natural-compare-wrapper.js.map