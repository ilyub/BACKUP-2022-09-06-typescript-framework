export class PouchRetryError extends Error {
  public override readonly name = "PouchRetryError";

  /**
   * Creates class instance.
   *
   * @param message - Message.
   */
  public constructor(message: string) {
    super(message);
  }
}
