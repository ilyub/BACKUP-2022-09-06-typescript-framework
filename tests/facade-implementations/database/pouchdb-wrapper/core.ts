import { handlePouchError } from "@/facade-implementations/database/pouchdb-wrapper/core";

test("handlePouchError", () => {
  const error = new Error("Sample error");

  expect(() => {
    handlePouchError(error);
  }).toThrow(error);
});
