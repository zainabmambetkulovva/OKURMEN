import { getRedisClient } from './upstash-client';
import { RateLimitConfig, RateLimitResult } from './types';

/**
 * Sliding Window Rate Limiter using Redis ZSET
 * 
 * Algorithm:
 * 1. Remove old entries (older than window)
 * 2. Count remaining entries
 * 3. If count >= max, reject
 * 4. If count < max, add new entry and allow
 * 
 * Advantages:
 * - More accurate than Fixed Window
 * - Prevents burst at window boundaries
 * - Distributed (works across multiple instances)
 */

export class RateLimiter {
  /**
   * Check if request should be rate limited
   * 
   * @param identifier - Unique identifier (IP, email, userId)
   * @param config - Rate limit configuration
   * @returns RateLimitResult with success/failure and metadata
   */
  static async checkLimit(
    identifier: string,
    config: RateLimitConfig
  ): Promise<RateLimitResult> {
    const redis = getRedisClient();

    // If Redis is not available, allow request (fail open)
    if (!redis) {
      console.warn('⚠️  Redis unavailable, rate limiting disabled for this request');
      return {
        success: true,
        limit: config.max,
        remaining: config.max,
        reset: Date.now() + config.windowMs,
      };
    }

    try {
      const key = `${config.keyPrefix}:${identifier}`;
      const now = Date.now();
      const windowStart = now - config.windowMs;

      // Use Redis pipeline for atomic operations
      const pipeline = redis.pipeline();

      // 1. Remove old entries
      pipeline.zremrangebyscore(key, 0, windowStart);

      // 2. Count current entries
      pipeline.zcard(key);

      // 3. Add current request with timestamp
      pipeline.zadd(key, { score: now, member: `${now}-${Math.random()}` });

      // 4. Set expiry on key (cleanup)
      pipeline.expire(key, Math.ceil(config.windowMs / 1000));

      // Execute pipeline
      const results = await pipeline.exec();

      // Parse results
      // results[1] is the ZCARD result (count before adding new entry)
      const currentCount = (results[1] as number) || 0;

      // Calculate remaining and reset time
      const remaining = Math.max(0, config.max - currentCount - 1);
      const reset = now + config.windowMs;

      // Check if limit exceeded
      if (currentCount >= config.max) {
        const retryAfter = Math.ceil(config.windowMs / 1000);

        return {
          success: false,
          limit: config.max,
          remaining: 0,
          reset,
          retryAfter,
        };
      }

      // Allow request
      return {
        success: true,
        limit: config.max,
        remaining,
        reset,
      };
    } catch (error) {
      console.error('❌ Rate limit check error:', error);
      
      // Fail open: allow request if Redis error
      return {
        success: true,
        limit: config.max,
        remaining: config.max,
        reset: Date.now() + config.windowMs,
      };
    }
  }

  /**
   * Reset rate limit for identifier (admin function)
   */
  static async resetLimit(identifier: string, config: RateLimitConfig): Promise<boolean> {
    const redis = getRedisClient();

    if (!redis) {
      return false;
    }

    try {
      const key = `${config.keyPrefix}:${identifier}`;
      await redis.del(key);
      return true;
    } catch (error) {
      console.error('❌ Rate limit reset error:', error);
      return false;
    }
  }

  /**
   * Get current rate limit status (without incrementing)
   */
  static async getStatus(
    identifier: string,
    config: RateLimitConfig
  ): Promise<RateLimitResult> {
    const redis = getRedisClient();

    if (!redis) {
      return {
        success: true,
        limit: config.max,
        remaining: config.max,
        reset: Date.now() + config.windowMs,
      };
    }

    try {
      const key = `${config.keyPrefix}:${identifier}`;
      const now = Date.now();
      const windowStart = now - config.windowMs;

      // Remove old entries and count
      await redis.zremrangebyscore(key, 0, windowStart);
      const currentCount = await redis.zcard(key);

      const remaining = Math.max(0, config.max - currentCount);
      const reset = now + config.windowMs;

      return {
        success: currentCount < config.max,
        limit: config.max,
        remaining,
        reset,
      };
    } catch (error) {
      console.error('❌ Rate limit status check error:', error);
      return {
        success: true,
        limit: config.max,
        remaining: config.max,
        reset: Date.now() + config.windowMs,
      };
    }
  }

  /**
   * Block identifier for extended period (security measure)
   * Used after multiple violations
   */
  static async blockIdentifier(
    identifier: string,
    config: RateLimitConfig,
    durationMs: number = 3600000 // 1 hour default
  ): Promise<boolean> {
    const redis = getRedisClient();

    if (!redis) {
      return false;
    }

    try {
      const blockKey = `${config.keyPrefix}:blocked:${identifier}`;
      await redis.set(blockKey, '1', { px: durationMs });
      return true;
    } catch (error) {
      console.error('❌ Block identifier error:', error);
      return false;
    }
  }

  /**
   * Check if identifier is blocked
   */
  static async isBlocked(identifier: string, config: RateLimitConfig): Promise<boolean> {
    const redis = getRedisClient();

    if (!redis) {
      return false;
    }

    try {
      const blockKey = `${config.keyPrefix}:blocked:${identifier}`;
      const blocked = await redis.get(blockKey);
      return blocked === '1';
    } catch (error) {
      console.error('❌ Is blocked check error:', error);
      return false;
    }
  }

  /**
   * Unblock identifier (admin function)
   */
  static async unblockIdentifier(
    identifier: string,
    config: RateLimitConfig
  ): Promise<boolean> {
    const redis = getRedisClient();

    if (!redis) {
      return false;
    }

    try {
      const blockKey = `${config.keyPrefix}:blocked:${identifier}`;
      await redis.del(blockKey);
      return true;
    } catch (error) {
      console.error('❌ Unblock identifier error:', error);
      return false;
    }
  }
}

// Export everything
export * from './types';
export * from './config';
export * from './ip-utils';
export * from './upstash-client';
