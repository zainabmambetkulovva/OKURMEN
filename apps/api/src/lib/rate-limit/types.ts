// Rate Limiting Types

export interface RateLimitConfig {
  max: number;           // Maximum requests
  windowMs: number;      // Time window in milliseconds
  keyPrefix: string;     // Redis key prefix
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;         // Unix timestamp when limit resets
  retryAfter?: number;   // Seconds until retry (if blocked)
}

export interface RateLimitInfo {
  identifier: string;
  endpoint: string;
  timestamp: number;
  blocked: boolean;
}

export type RateLimitIdentifierType = 'ip' | 'email' | 'userId';

export interface RateLimitOptions {
  identifierType: RateLimitIdentifierType;
  identifier: string;
  config: RateLimitConfig;
}
