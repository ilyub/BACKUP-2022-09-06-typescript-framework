/**
 * @jest-environment @skylib/config/src/jest-env-jsdom
 */
import { database } from "@skylib/facades/dist/database";
import { uniqueId } from "@skylib/facades/dist/uniqueId";
import * as assert from "@skylib/functions/dist/assertions";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";

import { PouchConflictError } from "@/facade-implementations/database/PouchDBWrapper/errors/PouchConflictError";
import { PouchNotFoundError } from "@/facade-implementations/database/PouchDBWrapper/errors/PouchNotFoundError";

testUtils.installFakeTimer({ shouldAdvanceTime: true });

it("bulkDocs", async () => {
  const db = database.create(uniqueId());

  const { id } = await db.put({ value: 1 });

  const responses = await db.bulkDocs([
    { _id: id, value: 1 },
    { value: 2 },
    { value: 3 }
  ]);

  expect(responses.length).toStrictEqual(2);
  expect(responses[0]).toContainAllKeys(["id", "rev"]);
  expect(responses[1]).toContainAllKeys(["id", "rev"]);
});

it("exists", async () => {
  const db = database.create(uniqueId());

  const { id } = await db.put({});

  await expect(db.exists(id)).resolves.toBeTrue();
  await expect(db.exists(uniqueId())).resolves.toBeFalse();
});

it("existsAttached", async () => {
  const db = database.create(uniqueId());

  const { id: parentId } = await db.put({});

  const { id } = await db.putAttached(parentId, {});

  expect(id).toStrictEqual(0);
  await expect(db.existsAttached(0, parentId)).resolves.toBeTrue();
  await expect(db.existsAttached(1, parentId)).resolves.toBeFalse();
});

it("get|getIfExists", async () => {
  const db = database.create(uniqueId());

  {
    const { id, rev } = await db.put({ value: 1 });

    const expected = { _id: id, _rev: rev, value: 1 };

    await expect(
      Promise.all([db.get(id), db.getIfExists(id)])
    ).resolves.toStrictEqual([expected, expected]);

    {
      const error = new PouchNotFoundError("missing");

      await db.put({ _deleted: true, _id: id, _rev: rev });
      await expect(db.get(id)).rejects.toStrictEqual(error);
      await expect(db.getIfExists(id)).resolves.toBeUndefined();
    }
  }

  {
    const { id, rev } = await db.put({
      attachedDocs: [{ _id: 0, _rev: 1, b: false }],
      value: 1
    });

    const expected = { _id: id, _rev: rev, attachedDocs: [], value: 1 };

    await expect(
      Promise.all([db.get(id), db.getIfExists(id)])
    ).resolves.toStrictEqual([expected, expected]);

    {
      const error = new PouchNotFoundError("missing");

      await db.put({ _deleted: true, _id: id, _rev: rev });
      await expect(db.get(id)).rejects.toStrictEqual(error);
      await expect(db.getIfExists(id)).resolves.toBeUndefined();
    }
  }

  {
    const id = uniqueId();

    const error = new PouchNotFoundError("missing");

    await expect(db.get(id)).rejects.toStrictEqual(error);
    await expect(db.getIfExists(id)).resolves.toBeUndefined();
  }
});

it("getAttached|getAttachedIfExists", async () => {
  const db = database.create(uniqueId());

  const { id: parentId } = await db.put({ value: 1 });

  {
    const error = new PouchNotFoundError("Missing attached document");

    await expect(db.getAttached(0, parentId)).rejects.toStrictEqual(error);
    await expect(db.getAttachedIfExists(0, parentId)).resolves.toBeUndefined();
  }

  const { parentRev } = await db.putAttached(parentId, { value: 2 });

  {
    const expected = {
      _id: 0,
      _rev: 1,
      parentDoc: {
        _id: parentId,
        _rev: parentRev,
        attachedDocs: [],
        lastAttachedDoc: 0,
        value: 1
      },
      value: 2
    };

    await expect(
      Promise.all([
        db.getAttached(0, parentId),
        db.getAttachedIfExists(0, parentId)
      ])
    ).resolves.toStrictEqual([expected, expected]);
  }

  {
    const error = new PouchNotFoundError("Missing attached document");

    await expect(db.getAttached(1, parentId)).rejects.toStrictEqual(error);
    await expect(db.getAttachedIfExists(1, parentId)).resolves.toBeUndefined();
  }

  {
    const error = new PouchNotFoundError("Missing attached document");

    await db.putAttached(parentId, { _deleted: true, _id: 0, _rev: 1 });
    await expect(db.getAttached(0, parentId)).rejects.toStrictEqual(error);
    await expect(db.getAttachedIfExists(0, parentId)).resolves.toBeUndefined();
  }

  {
    const error = new PouchNotFoundError("missing");

    await expect(db.getAttached(0, uniqueId())).rejects.toStrictEqual(error);
    await expect(
      db.getAttachedIfExists(0, uniqueId())
    ).resolves.toBeUndefined();
  }
});

it("put", async () => {
  const db = database.create(uniqueId());

  const response1 = await db.put({
    attachedDocs: [{ _id: 0, _rev: 1, value: 1 }],
    value: 1
  });

  expect(response1).toContainAllKeys(["id", "rev"]);
  expect(response1.rev).toStartWith("1-");

  {
    const expected = {
      _id: response1.id,
      _rev: response1.rev,
      attachedDocs: [],
      value: 1
    };

    await expect(db.get(response1.id)).resolves.toStrictEqual(expected);
  }

  const response2 = await db.put({
    _id: response1.id,
    _rev: response1.rev,
    attachedDocs: [],
    value: 2
  });

  expect(response2).toContainAllKeys(["id", "rev"]);
  expect(response2.rev).toStartWith("2-");

  {
    const expected = {
      _id: response2.id,
      _rev: response2.rev,
      attachedDocs: [],
      value: 2
    };

    await expect(db.get(response2.id)).resolves.toStrictEqual(expected);
  }

  {
    const expected = {
      _id: 0,
      _rev: 1,
      parentDoc: {
        _id: response2.id,
        _rev: response2.rev,
        attachedDocs: [],
        value: 2
      },
      value: 1
    };

    await expect(db.getAttached(0, response2.id)).resolves.toStrictEqual(
      expected
    );
  }

  {
    const error = new PouchConflictError("Document update conflict");

    await expect(db.put({ _id: response2.id })).rejects.toStrictEqual(error);
  }
});

it("put: null|undefined", async () => {
  const db = database.create(uniqueId());

  const { id, rev } = await db.put({
    nullValue: null,
    undefinedValue: undefined
  });

  await expect(db.get(id)).resolves.toStrictEqual({
    _id: id,
    _rev: rev,
    nullValue: null
  });
});

it("put: validatePutDocument", async () => {
  const db = database.create(uniqueId());

  await expect(db.put({ _attachments: undefined })).rejects.toStrictEqual(
    new Error("Put document contains reserved word: _attachments")
  );

  await expect(db.put({ _conflicts: undefined })).rejects.toStrictEqual(
    new Error("Put document contains reserved word: _conflicts")
  );

  await expect(db.put({ filters: undefined })).rejects.toStrictEqual(
    new Error("Put document contains reserved word: filters")
  );

  await expect(db.put({ views: undefined })).rejects.toStrictEqual(
    new Error("Put document contains reserved word: views")
  );

  await expect(
    db.put({ attachedDocs: [{ _id: 1, _rev: 1 }] })
  ).rejects.toStrictEqual(new Error("Invalid attached document"));
});

it("putAttached", async () => {
  const db = database.create(uniqueId());

  const { id: parentId } = await db.put({ value: 1 });

  const response1 = await db.putAttached(parentId, { value: 2 });

  expect(response1).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response1.id).toStrictEqual(0);
  expect(response1.parentId).toStrictEqual(parentId);
  expect(response1.rev).toStrictEqual(1);

  {
    const expected = {
      _id: response1.parentId,
      _rev: response1.parentRev,
      attachedDocs: [],
      lastAttachedDoc: 0,
      value: 1
    };

    await expect(db.get(parentId)).resolves.toStrictEqual(expected);
  }

  {
    const expected = {
      _id: 0,
      _rev: 1,
      parentDoc: {
        _id: response1.parentId,
        _rev: response1.parentRev,
        attachedDocs: [],
        lastAttachedDoc: 0,
        value: 1
      },
      value: 2
    };

    await expect(db.getAttached(0, parentId)).resolves.toStrictEqual(expected);
  }

  const response2 = await db.putAttached(parentId, {
    _id: 0,
    _rev: 1,
    value: 3
  });

  expect(response2).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response2.id).toStrictEqual(0);
  expect(response2.parentId).toStrictEqual(parentId);
  expect(response2.rev).toStrictEqual(2);

  {
    const expected = {
      _id: response2.parentId,
      _rev: response2.parentRev,
      attachedDocs: [],
      lastAttachedDoc: 0,
      value: 1
    };

    await expect(db.get(parentId)).resolves.toStrictEqual(expected);
  }

  {
    const expected = {
      _id: 0,
      _rev: 2,
      parentDoc: {
        _id: response2.parentId,
        _rev: response2.parentRev,
        attachedDocs: [],
        lastAttachedDoc: 0,
        value: 1
      },
      value: 3
    };

    await expect(db.getAttached(0, parentId)).resolves.toStrictEqual(expected);
  }

  {
    const error = new PouchConflictError("Attached document update conflict");

    await expect(db.putAttached(parentId, { _id: 0 })).rejects.toStrictEqual(
      error
    );
  }
});

it("putIfNotExists", async () => {
  const db = database.create(uniqueId());

  const response1 = await db.putIfNotExists({});

  assert.not.empty(response1);
  expect(response1).toContainAllKeys(["id", "rev"]);
  expect(response1.rev).toStartWith("1-");

  const response2 = await db.putIfNotExists({
    _id: response1.id,
    _rev: response1.rev
  });

  assert.not.empty(response2);
  expect(response2).toContainAllKeys(["id", "rev"]);
  expect(response2.rev).toStartWith("2-");

  const response3 = await db.putIfNotExists({ _id: response2.id });

  expect(response3).toBeUndefined();
});

it("putAttachedIfNotExists", async () => {
  const db = database.create(uniqueId());

  const { id: parentId } = await db.put({});

  const response1 = await db.putAttachedIfNotExists(parentId, {});

  assert.not.empty(response1);
  expect(response1).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response1.id).toStrictEqual(0);
  expect(response1.parentId).toStrictEqual(parentId);
  expect(response1.rev).toStrictEqual(1);

  const response2 = await db.putAttachedIfNotExists(parentId, {
    _id: 0,
    _rev: 1
  });

  assert.not.empty(response2);
  expect(response2).toContainAllKeys(["id", "parentId", "parentRev", "rev"]);
  expect(response2.id).toStrictEqual(0);
  expect(response2.parentId).toStrictEqual(parentId);
  expect(response2.rev).toStrictEqual(2);

  const response3 = await db.putAttachedIfNotExists(parentId, { _id: 0 });

  expect(response3).toBeUndefined();
});

it("reset", async () => {
  const db = database.create(uniqueId());

  const id = uniqueId();

  const callback = jest.fn();

  {
    await db.put({ _id: id });
    await expect(db.exists(id)).resolves.toBeTrue();
  }

  {
    await db.reset();
    await expect(db.exists(id)).resolves.toBeFalse();
  }

  {
    expect(callback).not.toBeCalled();
    await db.reset(callback);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith();
    callback.mockClear();
  }
});

it("subscribe|subscribeAttached|unsubscribe|unsubscribeAttached", async () => {
  await testUtils.run(async () => {
    const db = database.create(uniqueId());

    const handler = jest.fn();

    const handlerAttached = jest.fn();

    const subscription = await db.subscribe(handler);

    const subscriptionAttached = await db.subscribeAttached(handlerAttached);

    const { id, rev } = await db.put({ value: 1 });

    {
      const expected = {
        _id: id,
        _rev: rev,
        value: 1
      };

      await wait(1000);
      expect(handler).toBeCalledTimes(1);
      expect(handler).toBeCalledWith(expected);
      expect(handlerAttached).not.toBeCalled();
      handler.mockClear();
    }

    const { parentId, parentRev } = await db.putAttached(id, { value: 2 });

    {
      const expected = {
        _id: parentId,
        _rev: parentRev,
        attachedDocs: [],
        lastAttachedDoc: 0,
        value: 1
      };

      const expectedAttached = {
        _id: 0,
        _rev: 1,
        parentDoc: expected,
        value: 2
      };

      await wait(1000);
      expect(handler).toBeCalledTimes(1);
      expect(handler).toBeCalledWith(expected);
      expect(handlerAttached).toBeCalledTimes(1);
      expect(handlerAttached).toBeCalledWith(expectedAttached);
      handler.mockClear();
      handlerAttached.mockClear();
    }

    {
      await db.unsubscribe(subscription);
      await db.unsubscribeAttached(subscriptionAttached);
      await db.put({ value: 1 });
      await db.putAttached(id, { value: 2 });
      await wait(1000);
      expect(handler).not.toBeCalled();
      expect(handlerAttached).not.toBeCalled();
    }
  });
});
