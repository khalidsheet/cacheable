import { AbstractCachable } from "../src/adapters/AbstractCacheable";

export class TestDatabaseCacheFactory extends AbstractCachable {
  get<T>(key: string): T | null {
    return null;
  }

  set<T>(key: string, value: T, ttl: number): void {
    return;
  }

  remember<T>(key: string, ttl: number, callback: () => T): T {
    return callback();
  }

  invalidate(key: string): void {
    return;
  }

  clear(): void {
    return;
  }
}
