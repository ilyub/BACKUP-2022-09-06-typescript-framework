import { evaluate, is } from "@skylib/functions";
export const isDocResponse = is.object.factory({ doc: is.unknown, key: is.unknown }, {});
export const isDocResponses = is.factory(is.array.of, isDocResponse);
export const isDocsResponse = is.object.factory({
    count: is.number,
    docs: isDocResponses,
    settled: is.boolean
}, {});
export const isExistingDocument = evaluate(() => {
    const isBaseStoredAttachedDocument = is.object.factory({ _id: is.number, _rev: is.number }, { _deleted: is.true, parentDoc: is.never });
    const isBaseStoredAttachedDocuments = is.factory(is.array.of, isBaseStoredAttachedDocument);
    return is.object.factory({ _id: is.string, _rev: is.string }, {
        _deleted: is.true,
        attachedDocs: isBaseStoredAttachedDocuments,
        lastAttachedDocs: is.numbers
    });
});
export const isExistingAttachedDocument = is.object.factory({
    _id: is.number,
    _rev: is.number,
    parentDoc: isExistingDocument
}, { _deleted: is.true });
export const isWrappablePouchError = is.object.factory({
    error: is.true,
    message: is.string,
    name: is.string,
    status: is.number
}, {});
//# sourceMappingURL=guards.js.map