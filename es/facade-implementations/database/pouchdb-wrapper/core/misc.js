import { __rest } from "tslib";
import { PouchConflictError, PouchNotFoundError } from "./errors";
import { is, o } from "@skylib/functions";
import { isWrappablePouchError } from "./guards";
/**
 * Extracts attached document.
 *
 * @param rawDoc - Raw document.
 * @param id - Attached document ID.
 * @param extractDeleted - Whether to extract deleted document.
 * @returns Attached document if exists, _undefined_ otherwise.
 */
export function extractAttachedDoc(rawDoc, id, extractDeleted = false) {
    const { attachedDocs } = rawDoc, parentDoc = __rest(rawDoc, ["attachedDocs"]);
    if (is.empty(attachedDocs))
        return undefined;
    const attachedDoc = attachedDocs[id];
    if (is.empty(attachedDoc))
        return undefined;
    if (is.not.empty(attachedDoc._deleted) && !extractDeleted)
        return undefined;
    return Object.assign(Object.assign({}, attachedDoc), { parentDoc: Object.assign(Object.assign({}, parentDoc), { attachedDocs: [] }) });
}
/**
 * Extracts document.
 *
 * @param rawDoc - Raw document.
 * @returns Document.
 */
export function extractDoc(rawDoc) {
    return rawDoc.attachedDocs ? Object.assign(Object.assign({}, rawDoc), { attachedDocs: [] }) : rawDoc;
}
/**
 * Handles PouchDB error.
 *
 * @param error - Error.
 */
export function handlePouchError(error) {
    throw wrapPouchError(error);
}
/**
 * Validates document.
 *
 * @param doc - Document.
 */
export function validatePutDocument(doc) {
    for (const key of ["_attachments", "_conflicts", "filters", "views"])
        if (o.hasOwnProp(key, doc))
            throw new Error(`Put document includes reserved key: ${key}`);
    if (doc.attachedDocs &&
        doc.attachedDocs.some((attachedDoc, index) => attachedDoc._id !== index))
        throw new Error("Invalid attached document");
}
/**
 * Converts pouchdb error to conventional error.
 *
 * @param value - Value.
 * @returns Converted pouchdb error or original value.
 */
export function wrapPouchError(value) {
    if (isWrappablePouchError(value)) {
        if (value.status === 404 && value.name === "not_found")
            return new PouchNotFoundError(value.message);
        if (value.status === 409 && value.name === "conflict")
            return new PouchConflictError(value.message);
        return new Error(value.message);
    }
    return value;
}
//# sourceMappingURL=misc.js.map