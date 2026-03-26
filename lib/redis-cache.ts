import { Redis } from 'ioredis';
import crypto from 'crypto';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  password: process.env.REDIS_PASSWORD || undefined, // Automatically uses password if defined in .env
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    return Math.min(times * 50, 2000); // Backoff for stability
  }
});

// Redis connection error handling (Prevents app crash)
redis.on('error', (err) => {
  console.error('[Redis Error]', err);
});

export interface CacheOptions {
  ttlSeconds?: number;
  skipCacheWrite?: boolean;
}

/**
 * 1. Cache Key Normalization
 * Deterministic builder that guarantees identical queries produce the identical cache key
 */
export function buildCacheKey(prefix: string, version: string, params: Record<string, string | undefined>): string {
  // Sort keys alphabetically to guarantee deterministic ordering
  const sortedKeys = Object.keys(params).sort();
  
  const queryParts = sortedKeys.map(k => {
    const val = params[k];
    if (!val) return null;
    
    // Normalize string: Trim, lowercase, strictly remove dangerous spacing/characters
    const normalizedVal = val.toString().trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    return `${k}:${normalizedVal}`;
  }).filter(Boolean);

  const queryHash = queryParts.length > 0 
    ? crypto.createHash('md5').update(queryParts.join('|')).digest('hex').substring(0, 8)
    : 'all';

  return `${prefix}:${version}:${queryHash}`;
}

/**
 * 2. Enterprise Cache Getter with Stampede Protection
 */
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const ttl = options.ttlSeconds ?? 3600;

  try {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);

    // CACHE MISS: Cache Stampede Protection (Mutex Lock)
    const lockKey = `lock:${key}`;
    // NX = Only set if not exists, PX 5000 = Expire lock in 5 seconds
    const lockAcquired = await redis.set(lockKey, 'locked', 'PX', 5000, 'NX');

    if (!lockAcquired) {
      // Another thread is fetching. Wait 300ms, then check cache lazily.
      await new Promise(resolve => setTimeout(resolve, 300));
      const retryCached = await redis.get(key);
      if (retryCached) return JSON.parse(retryCached);
      // If still missing, proceed to fetch locally as a supreme fallback.
    }

    // Execute heavy API operation
    const data = await fetcher();

    // Prevent malicious over-caching bloat by respecting the options flag
    if (!options.skipCacheWrite && data) {
      await redis.setex(key, ttl, JSON.stringify(data));
    }

    // Release the concurrency lock if we held it
    if (lockAcquired) {
      await redis.del(lockKey);
    }

    return data;
  } catch (error) {
    // gracefully falback to direct DB call on Redis total failure
    console.error(`[Redis] Failover for key ${key}, executing direct fetch...`, error);
    return fetcher();
  }
}

/**
 * 3. Cache Invalidation Helper utilizing Version Rotation Concept
 */
export async function getCacheVersion(prefix: string): Promise<string> {
  try {
    const version = await redis.get(`${prefix}:version`);
    return version || 'v1';
  } catch {
    return 'v1';
  }
}

export async function bumpCacheVersion(prefix: string): Promise<void> {
  try {
    await redis.incr(`${prefix}:version`);
  } catch (error) {
    console.error('[Redis] Failed to bump version', error);
  }
}
