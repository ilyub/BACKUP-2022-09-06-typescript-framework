import { reactiveStorage } from "@skylib/facades/dist/reactiveStorage";

interface Data {
  value: number;
}

it("reactiveStorage", () => {
  const x: Data = { value: 0 };

  const y: Data = reactiveStorage(x);

  {
    x.value = 1;
    expect(y.value).toStrictEqual(1);
  }

  {
    y.value = 2;
    expect(x.value).toStrictEqual(2);
  }
});

it("reactiveStorage.withChangesHandler", () => {
  const x: Data = { value: 0 };

  const y: Data = reactiveStorage.withChangesHandler(x, onChange, reduce);

  {
    x.value = 1;
    expect(y.value).toStrictEqual(1);
  }

  {
    y.value = 2;
    expect(x.value).toStrictEqual(2);
  }

  function onChange(): void {}

  function reduce(): boolean {
    return true;
  }
});
