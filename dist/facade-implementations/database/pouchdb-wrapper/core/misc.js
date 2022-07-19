"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapPouchError = exports.validatePutDocument = exports.handlePouchError = exports.extractDoc = exports.extractAttachedDoc = void 0;
const tslib_1 = require("tslib");
const errors_1 = require("./errors");
const functions_1 = require("@skylib/functions");
const guards_1 = require("./guards");
/**
 * Extracts attached document.
 *
 * @param rawDoc - Raw document.
 * @param id - Attached document ID.
 * @param extractDeleted - Whether to extract deleted document.
 * @returns Attached document if exists, _undefined_ otherwise.
 */
function extractAttachedDoc(rawDoc, id, extractDeleted = false) {
    const { attachedDocs } = rawDoc, parentDoc = tslib_1.__rest(rawDoc, ["attachedDocs"]);
    if (functions_1.is.empty(attachedDocs))
        return undefined;
    const attachedDoc = attachedDocs[id];
    if (functions_1.is.empty(attachedDoc))
        return undefined;
    if (functions_1.is.not.empty(attachedDoc._deleted) && !extractDeleted)
        return undefined;
    return Object.assign(Object.assign({}, attachedDoc), { parentDoc: Object.assign(Object.assign({}, parentDoc), { attachedDocs: [] }) });
}
exports.extractAttachedDoc = extractAttachedDoc;
/**
 * Extracts document.
 *
 * @param rawDoc - Raw document.
 * @returns Document.
 */
function extractDoc(rawDoc) {
    return rawDoc.attachedDocs ? Object.assign(Object.assign({}, rawDoc), { attachedDocs: [] }) : rawDoc;
}
exports.extractDoc = extractDoc;
/**
 * Handles PouchDB error.
 *
 * @param error - Error.
 */
function handlePouchError(error) {
    throw wrapPouchError(error);
}
exports.handlePouchError = handlePouchError;
/**
 * Validates document.
 *
 * @param doc - Document.
 */
function validatePutDocument(doc) {
    for (const key of ["_attachments", "_conflicts", "filters", "views"])
        if (functions_1.o.hasOwnProp(key, doc))
            throw new Error(`Put document includes reserved key: ${key}`);
    if (doc.attachedDocs &&
        doc.attachedDocs.some((attachedDoc, index) => attachedDoc._id !== index))
        throw new Error("Invalid attached document");
}
exports.validatePutDocument = validatePutDocument;
/**
 * Converts pouchdb error to conventional error.
 *
 * @param value - Value.
 * @returns Converted pouchdb error or original value.
 */
function wrapPouchError(value) {
    if ((0, guards_1.isWrappablePouchError)(value)) {
        if (value.status === 404 && value.name === "not_found")
            return new errors_1.PouchNotFoundError(value.message);
        if (value.status === 409 && value.name === "conflict")
            return new errors_1.PouchConflictError(value.message);
        return new Error(value.message);
    }
    return value;
}
exports.wrapPouchError = wrapPouchError;
//# sourceMappingURL=misc.js.map