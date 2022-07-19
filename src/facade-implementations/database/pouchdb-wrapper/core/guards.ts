import { evaluate, is } from "@skylib/functions";
import type { database } from "@skylib/facades";

export const isDocResponse = is.object.factory<DocResponse>(
  { doc: is.unknown, key: is.unknown },
  {}
);

export const isDocResponses = is.factory(is.array.of, isDocResponse);

export const isDocsResponse = is.object.factory<DocsResponse>(
  { count: is.number, docs: isDocResponses, settled: is.boolean },
  {}
);

export const isExistingDocument = evaluate(() => {
  const isBaseStoredAttachedDocument =
    is.object.factory<database.BaseStoredAttachedDocument>(
      { _id: is.number, _rev: is.number },
      { _deleted: is.true, parentDoc: is.never }
    );

  const isBaseStoredAttachedDocuments = is.factory(
    is.array.of,
    isBaseStoredAttachedDocument
  );

  return is.object.factory<database.ExistingDocument>(
    { _id: is.string, _rev: is.string },
    {
      _deleted: is.true,
      attachedDocs: isBaseStoredAttachedDocuments,
      lastAttachedDocs: is.numbers
    }
  );
});

export const isExistingAttachedDocument =
  is.object.factory<database.ExistingAttachedDocument>(
    { _id: is.number, _rev: is.number, parentDoc: isExistingDocument },
    { _deleted: is.true }
  );

export const isWrappablePouchError = is.object.factory<WrappablePouchError>(
  {
    error: is.true,
    message: is.string,
    name: is.string,
    status: is.number
  },
  {}
);

export interface DocResponse {
  readonly doc: unknown;
  readonly key: unknown;
}

export type DocResponses = readonly DocResponse[];

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
