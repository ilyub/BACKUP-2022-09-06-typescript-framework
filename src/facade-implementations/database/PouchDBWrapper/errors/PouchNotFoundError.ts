export class PouchNotFoundError extends Error {
  public override readonly name = "PouchNotFoundError";

  /**
   * Creates class instance.
   *
   * @param message - Message.
   */
  public constructor(message: string) {
    super(message);
  }
}
