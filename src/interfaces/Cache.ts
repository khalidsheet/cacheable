export interface Cache {
  /**
   * Get a value from the cache.
   * @param key The key to get the value for.
   * @returns The value if it exists and is not expired, otherwise null.
   */
  get<T>(key: string): T | null;

  /**
   *  Set a value in the cache.
   * @param key  The key to set the value for.
   * @param value  The value to set.
   * @param ttl  The time-to-live in milliseconds.
   * @returns void
   */
  set<T>(key: string, value: T, ttl: number): void;

  /**
   * Get a value from the cache, or set it if it doesn't exist.
   *
   * @param key  The key to get the value for.
   * @param ttl  The time-to-live in milliseconds.
   * @param callback  The callback to get the value if it doesn't exist.
   * @returns The value.
   */
  remember<T>(key: string, ttl: number, callback: () => T): T;

  /**
   * Invalidate a value in the cache.
   * @param key  The key to invalidate.
   * @returns void
   */
  invalidate(key: string): void;

  /**
   * Clear the cache.
   * @returns void
   */
  clear(): void;
}
