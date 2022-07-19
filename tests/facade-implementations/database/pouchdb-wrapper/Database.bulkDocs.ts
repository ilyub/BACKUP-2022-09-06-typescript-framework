/* eslint jest/max-expects: [warn, { max: 4 }] -- Ok */

import { a } from "@skylib/functions";
import { implementations } from "@";
import { uniqueId } from "@skylib/facades";

const pouchdb = new implementations.database.PouchWrapper();

test("bulkDocs", async () => {
  const db = pouchdb.create(uniqueId());

  const { id: id1, rev: rev1 } = await db.put({ x: 1 });

  const responses = await db.bulkDocs([
    { _id: id1 },
    { lastAttachedDocs: [2], x: 2 },
    { lastAttachedDocs: [3], x: 3 }
  ]);

  const { id: id2, rev: rev2 } = a.first(responses);

  const { id: id3, rev: rev3 } = a.second(responses);

  const doc1 = await db.get(id1);

  const doc2 = await db.get(id2);

  const doc3 = await db.get(id3);

  const expectedResponses = [
    { id: id2, rev: rev2 },
    { id: id3, rev: rev3 }
  ] as const;

  const expected1 = { _id: id1, _rev: rev1, x: 1 } as const;

  const expected2 = { _id: id2, _rev: rev2, x: 2 } as const;

  const expected3 = { _id: id3, _rev: rev3, x: 3 } as const;

  expect(responses).toStrictEqual(expectedResponses);
  expect(doc1).toStrictEqual(expected1);
  expect(doc2).toStrictEqual(expected2);
  expect(doc3).toStrictEqual(expected3);
});

test("bulkDocsAttached", async () => {
  const db = pouchdb.create(uniqueId());

  const id1 = uniqueId();

  const id2 = uniqueId();

  await db.bulkDocs([
    { _id: id1, x: 1 },
    { _id: id2, x: 2 }
  ]);

  const responses = await db.bulkDocsAttached([
    { parentDoc: { _id: id1, _rev: uniqueId() }, y: 1 },
    { parentDoc: { _id: id2, _rev: uniqueId() }, y: 2 }
  ]);

  const { parentRev: rev1 } = a.first(responses);

  const { parentRev: rev2 } = a.second(responses);

  const attachedDoc1 = await db.getAttached(0, id1);

  const attachedDoc2 = await db.getAttached(0, id2);

  const expectedResponses = [
    {
      id: 0,
      parentId: id1,
      parentRev: rev1,
      rev: 1
    },
    {
      id: 0,
      parentId: id2,
      parentRev: rev2,
      rev: 1
    }
  ] as const;

  const expected1 = {
    _id: 0,
    _rev: 1,
    parentDoc: {
      _id: id1,
      _rev: rev1,
      attachedDocs: [],
      lastAttachedDocs: [0],
      x: 1
    },
    y: 1
  } as const;

  const expected2 = {
    _id: 0,
    _rev: 1,
    parentDoc: {
      _id: id2,
      _rev: rev2,
      attachedDocs: [],
      lastAttachedDocs: [0],
      x: 2
    },
    y: 2
  } as const;

  expect(responses).toStrictEqual(expectedResponses);
  expect(attachedDoc1).toStrictEqual(expected1);
  expect(attachedDoc2).toStrictEqual(expected2);
});
