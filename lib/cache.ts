interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class CacheManager {
  private static readonly PREFIX = 'cache_';
  private static readonly DEFAULT_TTL = 60 * 60 * 1000; // 1 jam

  /**
   * Simpan data ke cache
   */
  static set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    if (typeof window === 'undefined') return;

    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl,
    };

    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to cache data:', error);
      // Jika localStorage penuh, hapus cache lama
      this.clearExpired();
    }
  }

  /**
   * Ambil data dari cache
   */
  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(this.PREFIX + key);
      if (!item) return null;

      const cached: CacheItem<T> = JSON.parse(item);

      // Cek apakah expired
      if (Date.now() > cached.expiresAt) {
        this.remove(key);
        return null;
      }

      return cached.data;
    } catch (error) {
      console.warn('Failed to get cached data:', error);
      return null;
    }
  }

  /**
   * Hapus cache tertentu
   */
  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.PREFIX + key);
  }

  /**
   * Cek apakah cache ada dan valid
   */
  static has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Hapus semua cache expired
   */
  static clearExpired(): void {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.PREFIX)) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const cached: CacheItem<any> = JSON.parse(item);
            if (Date.now() > cached.expiresAt) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          // Hapus jika corrupt
          localStorage.removeItem(key);
        }
      }
    });
  }

  /**
   * Hapus semua cache
   */
  static clear(): void {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Get cache size info
   */
  static getStats(): { count: number; size: number } {
    if (typeof window === 'undefined') return { count: 0, size: 0 };

    let count = 0;
    let size = 0;

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.PREFIX)) {
        count++;
        const item = localStorage.getItem(key);
        if (item) {
          size += new Blob([item]).size;
        }
      }
    });

    return { count, size };
  }
}

// Bersihkan cache expired saat load
if (typeof window !== 'undefined') {
  CacheManager.clearExpired();
}