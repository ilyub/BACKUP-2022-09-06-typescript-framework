import { inlineSearch } from "@skylib/facades/dist/inlineSearch";
import * as a from "@skylib/functions/dist/array";
import * as cast from "@skylib/functions/dist/converters";

import * as minisearchWrapper from "@/facade-implementations/inlineSearch/minisearch-wrapper";

it("implementation.create", () => {
  const engine = inlineSearch.create("id", ["value"], []);

  expect(engine).toBeInstanceOf(minisearchWrapper.Engine);
});

it("Engine.search", () => {
  const engine = inlineSearch.create(
    "id",
    ["name", "description"],
    [
      {
        description: "D1 d2 d3",
        id: "a",
        name: "N1 n2"
      },
      {
        description: "D2 d3 d4",
        id: "b",
        name: "N2 n3"
      },
      {
        description: "D3 d4 d5",
        id: "c",
        name: "N3 n4"
      }
    ]
  );

  expect(a.sort(engine.search("n1"), sort)).toStrictEqual(["a"]);
  expect(a.sort(engine.search("n2"), sort)).toStrictEqual(["a", "b"]);
  expect(a.sort(engine.search("n3"), sort)).toStrictEqual(["b", "c"]);
  expect(a.sort(engine.search("n4"), sort)).toStrictEqual(["c"]);
  expect(a.sort(engine.search("d1"), sort)).toStrictEqual(["a"]);
  expect(a.sort(engine.search("d2"), sort)).toStrictEqual(["a", "b"]);
  expect(a.sort(engine.search("d3"), sort)).toStrictEqual(["a", "b", "c"]);
  expect(a.sort(engine.search("d4"), sort)).toStrictEqual(["b", "c"]);
  expect(a.sort(engine.search("d5"), sort)).toStrictEqual(["c"]);

  function sort(x: unknown, y: unknown): number {
    return cast.string(x).localeCompare(cast.string(y));
  }
});
