import { MustBeDefinedError } from "@/decorators/errors/MustBeDefinedError";

const error1 = new MustBeDefinedError();

const error2 = new MustBeDefinedError("Custom message");

test("message", () => {
  expect(error1.message).toBe("Must be defined");
  expect(error2.message).toBe("Custom message");
});

test("name", () => {
  expect(error1.name).toBe("MustBeDefinedError");
  expect(error2.name).toBe("MustBeDefinedError");
});
