export class MustBeDefinedError extends Error {
  public override readonly name = "MustBeDefinedError";

  /**
   * Creates class instance.
   *
   * @param message - Message.
   */
  public constructor(message = "Must be defined") {
    super(message);
  }
}
