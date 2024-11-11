import { Cacheable } from "../src/interfaces/Cache";

export class TestDatabaseCacheFactory implements Cacheable {
  get<T>(key: string): T | null {
    return null;
  }

  set<T>(key: string, value: T, ttl: number): void {
    return;
  }

  remember<T>(key: string, ttl: number, callback: () => T): T {
    return callback();
  }

  rememberForever<T>(key: string, callback: () => T): T {
    return callback();
  }

  invalidate(key: string): void {
    return;
  }

  has<T>(key: string): boolean {
    return false;
  }

  clear(): void {
    return;
  }
}
