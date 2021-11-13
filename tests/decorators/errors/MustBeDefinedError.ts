import { MustBeDefinedError } from "@/decorators/errors/MustBeDefinedError";

const error1 = new MustBeDefinedError();

const error2 = new MustBeDefinedError("Custom message");

it("message", () => {
  expect(error1.message).toStrictEqual("Must be defined");
  expect(error2.message).toStrictEqual("Custom message");
});

it("name", () => {
  expect(error1.name).toStrictEqual("MustBeDefinedError");
  expect(error2.name).toStrictEqual("MustBeDefinedError");
});
