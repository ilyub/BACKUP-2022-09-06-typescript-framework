import { reactiveStorage } from "@skylib/facades/dist/reactiveStorage";

interface Data {
  value: number;
}

it("reactiveStorage", () => {
  const x: Data = { value: 0 };

  const y: Data = reactiveStorage(x);

  {
    y.value = 1;
    expect(x.value).toStrictEqual(1);
  }
});

it("reactiveStorage.withChangesHandler", () => {
  const onChange = jest.fn();

  const x: Data = { value: 0 };

  const y: Data = reactiveStorage.withChangesHandler(x, onChange, reduce);

  {
    y.value = 1;
    expect(x.value).toStrictEqual(1);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(1);
    onChange.mockClear();
  }

  {
    y.value = 3;
    expect(x.value).toStrictEqual(3);
    expect(onChange).not.toBeCalled();
  }

  {
    const error = new Error(
      "'set' on proxy: trap returned falsish for property 'value'"
    );

    Object.freeze(y);
    expect(() => {
      y.value = 4;
    }).toThrow(error);
  }

  function reduce(data: Data): number {
    return data.value % 2;
  }
});
