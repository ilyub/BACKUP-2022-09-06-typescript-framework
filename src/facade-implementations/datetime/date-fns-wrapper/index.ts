import { DateFnsWrapper } from "./DateFnsWrapper";

export const dateFnsWrapper = new DateFnsWrapper();

export namespace dateFnsWrapper {
  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
