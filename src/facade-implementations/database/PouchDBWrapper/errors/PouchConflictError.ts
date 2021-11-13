export class PouchConflictError extends Error {
  public override readonly name = "PouchConflictError";

  /**
   * Creates class instance.
   *
   * @param message - Message.
   */
  public constructor(message: string) {
    super(message);
  }
}
