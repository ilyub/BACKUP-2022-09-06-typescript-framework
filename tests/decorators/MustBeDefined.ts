import { MustBeDefinedError } from "@/decorators/errors/MustBeDefinedError";
import { MustBeDefined } from "@/decorators/MustBeDefined";
import { OwnProperty } from "@/decorators/OwnProperty";

class TestClass1 {
  public value!: number;
}

@OwnProperty.ClassDecorator
class TestClass2 {
  @MustBeDefined
  public value!: number;
}

it("MustBeDefined", () => {
  const c1 = new TestClass1();

  const c2 = new TestClass2();

  const error = new MustBeDefinedError(
    "Property must be defined: TestClass2.value"
  );

  {
    expect(() => c1.value).not.toThrow();
    expect(() => c2.value).toThrow(error);
  }

  {
    c1.value = 1;
    c2.value = 1;
    expect(c1.value).toStrictEqual(1);
    expect(c2.value).toStrictEqual(1);
  }
});
