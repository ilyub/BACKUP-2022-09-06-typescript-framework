import { reactiveStorage } from "@skylib/facades";

test("reactiveStorage", () => {
  const callback = jest.fn();

  const obj = reactiveStorage(reactiveStorage({ x: 0, y: { z: 0 } }));

  const observer = reactiveStorage.watch(obj, callback);

  {
    obj.x = 1;
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ x: 1, y: { z: 0 } });
    callback.mockClear();
  }

  {
    obj.y.z = 1;
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ x: 1, y: { z: 1 } });
    callback.mockClear();
  }

  {
    reactiveStorage.unwatch(obj, observer);
    obj.x = 2;
    obj.y.z = 2;
    expect(callback).not.toHaveBeenCalled();
  }

  {
    Object.freeze(obj);

    expect(() => {
      obj.x = 3;
      obj.y.z = 3;
    }).toThrow(
      new Error("'set' on proxy: trap returned falsish for property 'x'")
    );
  }
});

test("reactiveStorage: reducer", () => {
  const callback = jest.fn();

  const obj = reactiveStorage(reactiveStorage({ x: 0, y: { z: 0 } }));

  const observer = reactiveStorage.watch(obj, callback, value => value.x);

  {
    obj.x = 1;
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ x: 1, y: { z: 0 } });
    callback.mockClear();
  }

  {
    obj.y.z = 1;
    expect(callback).not.toHaveBeenCalled();
  }

  {
    reactiveStorage.unwatch(obj, observer);
    obj.x = 2;
    obj.y.z = 2;
    expect(callback).not.toHaveBeenCalled();
  }

  {
    Object.freeze(obj);

    expect(() => {
      obj.x = 3;
      obj.y.z = 3;
    }).toThrow(
      new Error("'set' on proxy: trap returned falsish for property 'x'")
    );
  }
});
