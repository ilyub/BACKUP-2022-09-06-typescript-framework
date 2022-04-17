import * as facadeImplementations from "@/facade-implementations";

const miniSearchWrapper = facadeImplementations.inlineSearch.miniSearchWrapper;

test.each([
  { ids: ["a"], searchString: "n1" },
  { ids: ["a", "b"], searchString: "n2" },
  { ids: ["b", "c"], searchString: "n3" },
  { ids: ["c"], searchString: "n4" },
  { ids: ["a"], searchString: "d1" },
  { ids: ["a", "b"], searchString: "d2" },
  { ids: ["a", "b", "c"], searchString: "d3" },
  { ids: ["b", "c"], searchString: "d4" },
  { ids: ["c"], searchString: "d5" }
])("engine.search", ({ ids, searchString }) => {
  const items: Items = [
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
  ];

  const engine = miniSearchWrapper.create("id", ["name", "description"], items);

  const expected = items.filter(item => ids.includes(item.id));

  expect(engine.search(searchString)).toStrictEqual(expected);

  interface Item {
    readonly description: string;
    readonly id: string;
    readonly name: string;
  }

  type Items = readonly Item[];
});
