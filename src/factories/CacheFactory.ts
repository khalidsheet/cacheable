import { InMemoryCacheable } from "../adapters/InMemoryCacheable";
import { Cacheable } from "../interfaces/Cache";
import { CreateCacheOptions } from "../types/CreateCacheOptions";

export class CacheFactory {
  /**
   * Create a cache instance
   * @param cacheStrategy The cache strategy to use
   * @returns The cache instance, defaults to in-memory cache
   */
  static createCache(options?: CreateCacheOptions): Cacheable {
    const { cacheStrategy } = options || {};
    if (cacheStrategy) {
      return cacheStrategy;
    }

    return new InMemoryCacheable();
  }

  /**
   * Use a cache instance
   * @param cacheStrategy The cache strategy to use
   * @returns The cache instance
   */
  static use(cacheStrategy: Cacheable): Cacheable {
    return cacheStrategy;
  }
}
