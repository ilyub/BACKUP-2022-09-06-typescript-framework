import { defineFn } from "@skylib/functions";
import naturalCompare from "natural-compare";
export const naturalCompareWrapper = defineFn((x, y) => Math.sign(x - y), { strings: naturalCompare });
//# sourceMappingURL=natural-compare-wrapper.js.map