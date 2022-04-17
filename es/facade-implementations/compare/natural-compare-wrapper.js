import { o } from "@skylib/functions";
import naturalCompare from "natural-compare";
export const implementation = o.extend((x, y) => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
    if (x > y)
        return 1;
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
    if (x < y)
        return -1;
    return 0;
}, { strings: naturalCompare });
//# sourceMappingURL=natural-compare-wrapper.js.map