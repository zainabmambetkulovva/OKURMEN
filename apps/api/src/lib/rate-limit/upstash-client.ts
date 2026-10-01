import { Redis } from '@upstash/redis';

/**
 * Upstash Redis Client (Singleton)
 * 
 * Используется для centralized rate limiting
 * Работает через REST API (не требует TCP connection)
 */

let redisClient: Redis | null = null;

export function getRedisClient(): Redis | null {
  // Check if rate limiting is enabled
  if (process.env.ENABLE_RATE_LIMIT === 'false') {
    return null;
  }

  // Check if credentials exist
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('⚠️  Upstash Redis credentials not found. Rate limiting DISABLED.');
    console.warn('   Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to enable.');
    return null;
  }

  // Return existing client (singleton)
  if (redisClient) {
    return redisClient;
  }

  // Create new client
  try {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
      // Retry configuration
      retry: {
        retries: 3,
        backoff: (retryCount) => Math.min(1000 * 2 ** retryCount, 3000),
      },
    });

    console.log('✓ Upstash Redis client initialized');
    return redisClient;
  } catch (error) {
    console.error('❌ Failed to initialize Upstash Redis:', error);
    return null;
  }
}

/**
 * Test Redis connection
 */
export async function testRedisConnection(): Promise<boolean> {
  const redis = getRedisClient();
  
  if (!redis) {
    return false;
  }

  try {
    await redis.ping();
    console.log('✓ Upstash Redis connection successful');
    return true;
  } catch (error) {
    console.error('❌ Upstash Redis connection failed:', error);
    return false;
  }
}

/**
 * Close Redis connection (cleanup)
 */
export function closeRedisConnection(): void {
  if (redisClient) {
    // Upstash REST client doesn't need explicit close
    redisClient = null;
    console.log('✓ Redis connection closed');
  }
}
