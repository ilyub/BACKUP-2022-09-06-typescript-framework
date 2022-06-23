import { implementations } from "@";

const { reflectStorage } = implementations.reactiveStorage;

test("reducer", () => {
  const callback = jest.fn();

  const obj = reflectStorage(reflectStorage({ x: 0, y: { z: 0 } }));

  const observer = reflectStorage.watch(obj, callback, value => value.x);

  {
    obj.x = 1;
    expect(callback).mockCallsToBe([{ x: 1, y: { z: 0 } }]);
  }

  {
    obj.y.z = 1;
    expect(callback).mockCallsToBe();
  }

  {
    reflectStorage.unwatch(obj, observer);
    obj.x = 2;
    obj.y.z = 2;
    expect(callback).mockCallsToBe();
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
    expect(callback).mockCallsToBe([{ x: 1, y: { z: 0 } }]);
  }

  {
    obj.y.z = 1;
    expect(callback).mockCallsToBe([{ x: 1, y: { z: 1 } }]);
  }

  {
    reflectStorage.unwatch(obj, observer);
    obj.x = 2;
    obj.y.z = 2;
    expect(callback).mockCallsToBe();
  }

  {
    Object.freeze(obj);
    expect(() => {
      obj.x = 3;
    }).toThrow("'set' on proxy: trap returned falsish for property 'x'");
  }
});
