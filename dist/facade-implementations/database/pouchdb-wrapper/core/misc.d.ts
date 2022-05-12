import type { database } from "@skylib/facades";
/**
 * Extracts attached document.
 *
 * @param rawDoc - Raw document.
 * @param id - Attached document ID.
 * @param extractDeleted - Whether to extract deleted document.
 * @returns Attached document if exists, _undefined_ otherwise.
 */
export declare function extractAttachedDoc(rawDoc: database.ExistingDocument, id: number, extractDeleted?: boolean): database.ExistingAttachedDocument | undefined;
/**
 * Extracts document.
 *
 * @param rawDoc - Raw document.
 * @returns Document.
 */
export declare function extractDoc(rawDoc: database.ExistingDocument): database.ExistingDocument;
/**
 * Handles PouchDB error.
 *
 * @param error - Error.
 */
export declare function handlePouchError(error: unknown): void;
/**
 * Validates document.
 *
 * @param doc - Document.
 */
export declare function validatePutDocument(doc: database.PutDocument): void;
/**
 * Converts pouchdb error to conventional error.
 *
 * @param value - Value.
 * @returns Converted pouchdb error or original value.
 */
export declare function wrapPouchError(value: unknown): unknown;
//# sourceMappingURL=misc.d.ts.map