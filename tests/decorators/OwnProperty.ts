import { OwnProperty } from "@/decorators/OwnProperty";

class TestClass1 {
  public get value1(): number {
    return this._value;
  }

  public set value1(value: number) {
    this._value = value;
  }

  public get value2(): number {
    return this._value;
  }

  public set value2(value: number) {
    this._value = value;
  }

  protected _value = 1;
}

@OwnProperty.ClassDecorator
class TestClass2 {
  @OwnProperty
  public get value1(): number {
    return this._value;
  }

  public set value1(value: number) {
    this._value = value;
  }

  @OwnProperty
  public get value2(): number {
    return this._value;
  }

  public set value2(value: number) {
    this._value = value;
  }

  protected _value = 1;
}

beforeEach(() => {
  OwnProperty.resetValidators();
});

test("ownProperty, OwnProperty.ClassDecorator", () => {
  const c1 = new TestClass1();

  const c2 = new TestClass2();

  {
    const descriptors1 = Object.getOwnPropertyDescriptors(c1);

    const descriptors2 = Object.getOwnPropertyDescriptors(c2);

    const expected1 = ["_value"];

    const expected2 = ["_value", "value1", "value2"];

    expect(OwnProperty.validate).not.toThrow();
    expect(Object.keys(descriptors1)).toStrictEqual(expected1);
    expect(Object.keys(descriptors2)).toStrictEqual(expected2);
    expect(c1.value1).toBe(1);
    expect(c2.value1).toBe(1);
  }

  {
    c1.value1 = 2;
    c2.value1 = 2;
    expect(c1.value2).toBe(2);
    expect(c2.value2).toBe(2);
  }

  {
    c1.value2 = 3;
    c2.value2 = 3;
    expect(c1.value1).toBe(3);
    expect(c2.value1).toBe(3);
  }
});

test("ownProperty.resetValidators, OwnProperty.validate", () => {
  {
    expect(OwnProperty.validate).not.toThrow();

    class TestClass {
      @OwnProperty
      public get value(): number {
        return this._value;
      }

      public set value(value: number) {
        this._value = value;
      }

      protected _value = 1;
    }

    const error = new Error("Missing OwnProperty.ClassDecorator: TestClass");

    expect(OwnProperty.validate).toThrow(error);
    expect(new TestClass()).toBeInstanceOf(TestClass);
  }

  {
    OwnProperty.resetValidators();
    expect(OwnProperty.validate).not.toThrow();
  }
});
