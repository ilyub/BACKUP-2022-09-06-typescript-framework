/* eslint-disable @skylib/no-at-sign-internal-import -- Ok */
/* eslint-disable @skylib/no-internal-modules -- Ok */

import { handlePouchError } from "@/facade-implementations/database/pouchdb-wrapper/core";

test("handlePouchError", () => {
  const error = new Error("Sample error");

  expect(() => {
    handlePouchError(error);
  }).toThrow(error);
});
