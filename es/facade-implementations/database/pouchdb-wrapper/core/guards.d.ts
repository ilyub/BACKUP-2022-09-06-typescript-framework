import { is } from "@skylib/functions";
import type { database } from "@skylib/facades";
export declare const isDocResponse: is.Guard<DocResponse>;
export declare const isDocResponses: is.Guard<readonly DocResponse[]>;
export declare const isDocsResponse: is.Guard<DocsResponse>;
export declare const isExistingDocument: is.Guard<database.ExistingDocument>;
export declare const isExistingAttachedDocument: is.Guard<database.ExistingAttachedDocument>;
export declare const isWrappablePouchError: is.Guard<WrappablePouchError>;
export interface DocResponse {
    readonly doc: unknown;
    readonly key: unknown;
}
export declare type DocResponses = readonly DocResponse[];
export interface DocsResponse {
    readonly count: number;
    readonly docs: DocResponses;
    readonly settled: boolean;
}
export interface WrappablePouchError {
    readonly error: true;
    readonly message: string;
    readonly name: string;
    readonly status: number;
}
//# sourceMappingURL=guards.d.ts.map