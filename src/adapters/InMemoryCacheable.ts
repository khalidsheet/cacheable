import { Cacheable } from "../interfaces/Cache";
import { CacheItem } from "../interfaces/CacheItem";

export class InMemoryCacheable implements Cacheable {
  private _cache: Map<string, CacheItem> = new Map();

  get<T>(key: string): T | null {
    const item = this._cache.get(key);
    if (!item) {
      return null;
    }

    if (item.expiry < Date.now()) {
      this._cache.delete(key);
      return null;
    }

    return item.value;
  }

  set<T>(key: string, value: T, ttl: number): void {
    if (ttl <= 0) {
      this._cache.delete(key);
      return;
    }

    let cachedValue = value;

    if (typeof value === "function") {
      this._cache.delete(key);
      cachedValue = value();
    }

    this._cache.set(key, {
      value: cachedValue,
      expiry: this._getTTl(ttl),
    });
  }

  has(key: string): boolean {
    return this._cache.has(key);
  }

  remember<T>(key: string, ttl: number, callback: () => T): T {
    const item = this._cache.get(key);
    if (item && item.expiry > Date.now()) {
      return item.value;
    }

    const value = callback();
    this._cache.set(key, {
      value,
      expiry: this._getTTl(ttl),
    });

    return value;
  }

  rememberForever<T>(key: string, callback: () => T): T {
    return this.remember(key, 311040000, callback);
  }

  invalidate(key: string): void {
    this._cache.delete(key);
  }

  clear(): void {
    this._cache.clear();
  }

  private _getTTl(ttl: number): number {
    return Date.now() + ttl;
  }
}
