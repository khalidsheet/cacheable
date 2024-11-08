import MemoryCacheable from "../src/adapters/MemoryCacheable";
import { Cache } from "../src/interfaces/Cache";

describe("MemoryCacheable", () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new MemoryCacheable();
  });

  afterEach(() => {
    cache.clear();
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
    expect(cache.get("key")).toBe;
  });

  it("should remember the cached value and cache it again if expired", () => {
    const callback = jest.fn(() => "value");
    cache.set("key", "value", 100);
    expect(cache.remember("key", 1000, callback)).toBe("value");
    expect(callback).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(cache.remember("key", 1000, callback)).toBe("value");
      expect(callback).toHaveBeenCalledTimes(1);
    }, 200);
  });
});
