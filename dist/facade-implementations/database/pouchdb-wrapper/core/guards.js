"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWrappablePouchError = exports.isExistingAttachedDocument = exports.isExistingDocument = exports.isDocsResponse = exports.isDocResponses = exports.isDocResponse = void 0;
const functions_1 = require("@skylib/functions");
exports.isDocResponse = functions_1.is.object.factory({ doc: functions_1.is.unknown, key: functions_1.is.unknown }, {});
exports.isDocResponses = functions_1.is.factory(functions_1.is.array.of, exports.isDocResponse);
exports.isDocsResponse = functions_1.is.object.factory({
    count: functions_1.is.number,
    docs: exports.isDocResponses,
    settled: functions_1.is.boolean
}, {});
exports.isExistingDocument = functions_1.fn.run(() => {
    const isBaseStoredAttachedDocument = functions_1.is.object.factory({ _id: functions_1.is.number, _rev: functions_1.is.number }, { _deleted: functions_1.is.true, parentDoc: functions_1.is.never });
    const isBaseStoredAttachedDocuments = functions_1.is.factory(functions_1.is.array.of, isBaseStoredAttachedDocument);
    return functions_1.is.object.factory({ _id: functions_1.is.string, _rev: functions_1.is.string }, {
        _deleted: functions_1.is.true,
        attachedDocs: isBaseStoredAttachedDocuments,
        lastAttachedDocs: functions_1.is.numbers
    });
});
exports.isExistingAttachedDocument = functions_1.is.object.factory({
    _id: functions_1.is.number,
    _rev: functions_1.is.number,
    parentDoc: exports.isExistingDocument
}, { _deleted: functions_1.is.true });
exports.isWrappablePouchError = functions_1.is.object.factory({
    error: functions_1.is.true,
    message: functions_1.is.string,
    name: functions_1.is.string,
    status: functions_1.is.number
}, {});
//# sourceMappingURL=guards.js.map