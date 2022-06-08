import type { Configurable } from "./core";
import type { progressReporter } from "@skylib/facades";
export declare const progressBar: Configurable & progressReporter.Facade;
export declare namespace progressBar {
    type Configuration = import("./core").Configuration;
    type PartialConfiguration = import("./core").PartialConfiguration;
}
//# sourceMappingURL=index.d.ts.map