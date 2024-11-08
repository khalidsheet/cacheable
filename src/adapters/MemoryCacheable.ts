import { Cache } from "../interfaces/Cache";

interface CacheItem {
  value: any;
  expiry: number;
}

export default class InMemoryCacheable implements Cache {
  private cache: Map<string, CacheItem> = new Map();

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }

    if (item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  set<T>(key: string, value: T, ttl: number): void {
    if (ttl <= 0) {
      this.cache.delete(key);
      return;
    }

    let cachedValue = value;

    if (typeof value === "function") {
      this.cache.delete(key);
      cachedValue = value();
    }

    this.cache.set(key, {
      value: cachedValue,
      expiry: Date.now() + ttl,
    });
  }

  remember<T>(key: string, ttl: number, callback: () => T): T {
    const item = this.cache.get(key);
    if (item && item.expiry > Date.now()) {
      return item.value;
    }

    const value = callback();
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl,
    });

    return value;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
