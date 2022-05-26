import { implementations } from "@";

const { reflectStorage } = implementations.reactiveStorage;

test("reducer", () => {
  const callback = jest.fn();

  const obj = reflectStorage(reflectStorage({ x: 0, y: { z: 0 } }));

  const observer = reflectStorage.watch(obj, callback, value => value.x);

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
    reflectStorage.unwatch(obj, observer);
    obj.x = 2;
    obj.y.z = 2;
    expect(callback).not.toHaveBeenCalled();
  }

  {
    Object.freeze(obj);
    expect(() => {
      obj.x = 3;
    }).toThrow("'set' on proxy: trap returned falsish for property 'x'");
  }
});

test("watch, unwatch", () => {
  const callback = jest.fn();

  const obj = reflectStorage(reflectStorage({ x: 0, y: { z: 0 } }));

  const observer = reflectStorage.watch(obj, callback);

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
    reflectStorage.unwatch(obj, observer);
    obj.x = 2;
    obj.y.z = 2;
    expect(callback).not.toHaveBeenCalled();
  }

  {
    Object.freeze(obj);
    expect(() => {
      obj.x = 3;
    }).toThrow("'set' on proxy: trap returned falsish for property 'x'");
  }
});
