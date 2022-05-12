import { AxiosWrapper } from "./AxiosWrapper";

export const axiosWrapper = new AxiosWrapper();

export namespace axiosWrapper {
  export type Configuration = import("./types").Configuration;

  export type PartialConfiguration = import("./types").PartialConfiguration;
}
