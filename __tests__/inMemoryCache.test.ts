import { CacheFactory } from "./../src/factories/CacheFactory";
import { Cacheable } from "./../src/interfaces/Cache";
import { TestDatabaseCacheFactory } from "../__mocks__/DatabaseFactory";
import { InMemoryCacheable } from "../src/adapters/InMemoryCacheable";

describe("MemoryCacheable", () => {
  let cache: Cacheable;

  beforeEach(() => {
    cache = CacheFactory.createCache();
  });

  it("should set and get a value", () => {
    cache.set("key", "value", 1000);
    expect(cache.get("key")).toBe("value");
  });

  it("should return null if the key does not exist", () => {
    expect(cache.get("key")).toBeNull();
  });

  it("should return null if the key is expired", (done) => {
    cache.set("key", "value", 100);
    // Wait for the value to expire by advancing the time
    setTimeout(() => {
      const value = cache.get<string>("key");
      expect(value).toBeNull();
      done();
    }, 400);
  });

  it("should remember a value", () => {
    const callback = jest.fn(() => "value");
    expect(cache.remember("key", 1000, callback)).toBe("value");
    expect(callback).toHaveBeenCalledTimes(1);
    expect(cache.get("key")).toBe("value");
  });

  it("should not call the callback if the value is cached", () => {
    const callback = jest.fn(() => "value");
    cache.set("key", "value", 1000);
    expect(cache.remember("key", 1000, callback)).toBe("value");
    expect(callback).not.toHaveBeenCalled();
  });

  it("should invalidate a value", () => {
    cache.set("key", "value", 1000);
    cache.invalidate("key");
    expect(cache.get("key")).toBeNull();
  });

  it("should clear the cache", () => {
    cache.set("key", "value", 1000);
    cache.clear();
    expect(cache.get("key")).toBe(null);
  });

  it("should remember the cached value and cache it again if expired", (done) => {
    const callback = jest.fn(() => "value");
    cache.set("key", "value", 100);
    expect(cache.remember("key", 1000, callback)).toBe("value");
    expect(callback).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(cache.remember("key", 1000, callback)).toBe("value");
      expect(callback).toHaveBeenCalledTimes(1);
      done();
    }, 200);
  });

  it("should remove the value if the ttl is less than or equal to 0", () => {
    cache.set("key", "value", 1000);
    expect(cache.get("key")).toBe("value");

    cache.set("key", "value", 0);
    expect(cache.get("key")).toBeNull();

    cache.set("key", "value", 1000);
    expect(cache.get("key")).toBe("value");

    cache.set("key", "value", -1);
    expect(cache.get("key")).toBeNull();
  });

  it("should evaluate and cache the value if it is a function", () => {
    const callback = jest.fn(() => "value");
    cache.set("key", callback, 1000);
    expect(cache.get("key")).toBe("value");
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should create a cache instance with a custom strategy", () => {
    const cacheStrategy = new TestDatabaseCacheFactory();
    const cache = CacheFactory.createCache({
      cacheStrategy: cacheStrategy,
    });
    expect(cache).toBeInstanceOf(TestDatabaseCacheFactory);
  });

  it("should use a cache instance", () => {
    const cacheStrategy = new TestDatabaseCacheFactory();
    const cache = CacheFactory.use(cacheStrategy);
    expect(cache).toBeInstanceOf(TestDatabaseCacheFactory);
  });

  it("should check if a key exists in the cache", () => {
    cache.set("key", "value", 1000);
    expect(cache.has("key")).toBe(true);
    expect(cache.has("non-existent-key")).toBe(false);
  });

  it("should remember a value forever", () => {
    const callback = jest.fn(() => "value");
    expect(cache.rememberForever("key", callback)).toBe("value");
    expect(callback).toHaveBeenCalledTimes(1);
    expect(cache.get("key")).toBe("value");
  });
});
