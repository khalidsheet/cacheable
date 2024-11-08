import { AbstractCachable } from "../adapters/AbstractCacheable";
import InMemoryCacheable from "../adapters/MemoryCacheable";
import { Cache } from "../interfaces/Cache";

export class CacheFactory {
  /**
   * Create a cache instance
   * @param cacheStrategy The cache strategy to use
   * @returns The cache instance, defaults to in-memory cache
   */
  static createCache(cacheStrategy?: AbstractCachable): Cache {
    if (cacheStrategy) {
      return cacheStrategy;
    }

    return new InMemoryCacheable();
  }
}
