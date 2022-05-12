import { PromiseHandler } from "./PromiseHandler";

export const promiseHandler = new PromiseHandler();

export namespace promiseHandler {
  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
