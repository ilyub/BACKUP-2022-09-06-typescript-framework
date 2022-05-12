import { defineFn } from "@skylib/functions";
import naturalCompare from "natural-compare";
export const naturalCompareWrapper = defineFn(
// eslint-disable-next-line @skylib/require-jsdoc, no-type-assertion/no-type-assertion -- Ok
(x, y) => Math.sign(x - y), { strings: naturalCompare });
//# sourceMappingURL=natural-compare-wrapper.js.map