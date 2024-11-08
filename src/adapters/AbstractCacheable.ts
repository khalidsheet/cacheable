import { Cache } from "../interfaces/Cache";

export abstract class AbstractCachable implements Cache {
  /**
   * Get a value from the cache
   * @param key - The cache key
   */
  abstract get<T>(key: string): T | null;

  /**
   * Set a value in the cache
   * @param key - The cache key
   * @param value - The value to store
   * @param ttl - The time-to-live for the cache in milliseconds
   */
  abstract set<T>(key: string, value: T, ttl: number): void;

  /**
   * Remember a value in the cache, and compute it if it doesn't exist
   * @param key - The cache key
   * @param ttl - The time-to-live for the cache in milliseconds
   * @param callback - A function that computes the value if not in the cache
   */
  abstract remember<T>(key: string, ttl: number, callback: () => T): T;

  /**
   * Invalidate a cache entry by its key
   * @param key - The cache key
   */
  abstract invalidate(key: string): void;

  /**
   * Clear all entries in the cache
   */
  abstract clear(): void;
}
