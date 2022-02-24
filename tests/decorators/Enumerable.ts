import { Enumerable } from "@/decorators/Enumerable";
import { OwnProperty } from "@/decorators/OwnProperty";

@OwnProperty.ClassDecorator
class TestClass1 {
  @OwnProperty
  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }

  protected _value = 1;
}

@OwnProperty.ClassDecorator
class TestClass2 {
  @Enumerable
  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }

  protected _value = 1;
}

test("enumerable", () => {
  const c1 = new TestClass1();

  const c2 = new TestClass2();

  const expected1 = [["_value", 1]];

  const expected2 = [
    ["_value", 1],
    ["value", 1]
  ];

  expect(Object.entries(c1)).toStrictEqual(expected1);
  expect(Object.entries(c2)).toStrictEqual(expected2);
});
