import { ProgressBar } from "./ProgressBar";

export const progressBar = new ProgressBar();

export namespace progressBar {
  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
