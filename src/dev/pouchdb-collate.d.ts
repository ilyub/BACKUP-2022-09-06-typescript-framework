declare module "pouchdb-collate" {
  /**
   * Compares two keys.
   *
   * @param key1 - Key 1.
   * @param key2 - Key 2.
   * @returns Comparison result.
   */
  function collate(key1: unknown, key2: unknown): number;

  /**
   * Unserializes key.
   *
   * @param key - Key.
   * @returns Unserialized key.
   */
  function parseIndexableString(key: string): unknown;

  /**
   * Serializes key.
   *
   * @param key - Key.
   * @returns Serialized key.
   */
  function toIndexableString(key: unknown): string;
}
