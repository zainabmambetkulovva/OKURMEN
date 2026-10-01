import { RateLimitConfig } from './types';

// Helper to get env var as number with default
function getEnvNumber(key: string, defaultValue: number): number {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
}

// Convert seconds to milliseconds
function secondsToMs(seconds: number): number {
  return seconds * 1000;
}

/**
 * Rate Limit Configurations per Endpoint
 * 
 * ВАЖНО: Эти значения можно переопределить через environment variables
 */

// Login endpoint - СТРОГИЙ лимит (brute-force protection)
export const LOGIN_RATE_LIMIT: RateLimitConfig = {
  max: getEnvNumber('RATE_LIMIT_LOGIN_MAX', 5),
  windowMs: secondsToMs(getEnvNumber('RATE_LIMIT_LOGIN_WINDOW', 900)), // 15 min
  keyPrefix: 'rate-limit:auth-signin',
  skipSuccessfulRequests: false, // Count ALL attempts
  skipFailedRequests: false,
};

// 2FA Request - СТРОГИЙ лимит (prevent code spam)
export const TWO_FA_REQUEST_RATE_LIMIT: RateLimitConfig = {
  max: getEnvNumber('RATE_LIMIT_2FA_REQUEST_MAX', 3),
  windowMs: secondsToMs(getEnvNumber('RATE_LIMIT_2FA_REQUEST_WINDOW', 900)), // 15 min
  keyPrefix: 'rate-limit:2fa-request',
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
};

// 2FA Verify - ОЧЕНЬ СТРОГИЙ лимит (prevent code brute-force)
export const TWO_FA_VERIFY_RATE_LIMIT: RateLimitConfig = {
  max: getEnvNumber('RATE_LIMIT_2FA_VERIFY_MAX', 5),
  windowMs: secondsToMs(getEnvNumber('RATE_LIMIT_2FA_VERIFY_WINDOW', 900)), // 15 min
  keyPrefix: 'rate-limit:2fa-verify',
  skipSuccessfulRequests: true, // Only count failed attempts
  skipFailedRequests: false,
};

// Public API endpoints - УМЕРЕННЫЙ лимит
export const PUBLIC_API_RATE_LIMIT: RateLimitConfig = {
  max: getEnvNumber('RATE_LIMIT_PUBLIC_MAX', 100),
  windowMs: secondsToMs(getEnvNumber('RATE_LIMIT_PUBLIC_WINDOW', 60)), // 1 min
  keyPrefix: 'rate-limit:api-public',
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
};

// Authenticated API endpoints - МЯГКИЙ лимит
export const AUTH_API_RATE_LIMIT: RateLimitConfig = {
  max: getEnvNumber('RATE_LIMIT_AUTH_MAX', 300),
  windowMs: secondsToMs(getEnvNumber('RATE_LIMIT_AUTH_WINDOW', 60)), // 1 min
  keyPrefix: 'rate-limit:api-auth',
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
};

// Password reset - СТРОГИЙ лимит
export const PASSWORD_RESET_RATE_LIMIT: RateLimitConfig = {
  max: 3,
  windowMs: secondsToMs(3600), // 1 hour
  keyPrefix: 'rate-limit:password-reset',
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
};

// Registration - УМЕРЕННЫЙ лимит (prevent fake account spam)
export const REGISTRATION_RATE_LIMIT: RateLimitConfig = {
  max: 3,
  windowMs: secondsToMs(3600), // 1 hour
  keyPrefix: 'rate-limit:registration',
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
};

/**
 * Get rate limit config by endpoint pattern
 */
export function getRateLimitConfig(pathname: string, isAuthenticated: boolean): RateLimitConfig | null {
  // Feature flag check
  if (process.env.ENABLE_RATE_LIMIT === 'false') {
    return null;
  }

  // Authentication endpoints (highest priority)
  if (pathname === '/api/auth/signin') return LOGIN_RATE_LIMIT;
  if (pathname === '/api/auth/request-2fa') return TWO_FA_REQUEST_RATE_LIMIT;
  if (pathname === '/api/auth/verify-2fa') return TWO_FA_VERIFY_RATE_LIMIT;
  if (pathname.includes('/password-reset')) return PASSWORD_RESET_RATE_LIMIT;
  if (pathname.includes('/register') || pathname.includes('/signup')) return REGISTRATION_RATE_LIMIT;

  // API endpoints
  if (pathname.startsWith('/api/')) {
    return isAuthenticated ? AUTH_API_RATE_LIMIT : PUBLIC_API_RATE_LIMIT;
  }

  // Health check - NO rate limit
  if (pathname === '/api/health') return null;

  // Default: public rate limit for unmatched API routes
  return pathname.startsWith('/api/') ? PUBLIC_API_RATE_LIMIT : null;
}

/**
 * Export all configs for manual use
 */
export const RATE_LIMIT_CONFIGS = {
  login: LOGIN_RATE_LIMIT,
  twoFaRequest: TWO_FA_REQUEST_RATE_LIMIT,
  twoFaVerify: TWO_FA_VERIFY_RATE_LIMIT,
  publicApi: PUBLIC_API_RATE_LIMIT,
  authApi: AUTH_API_RATE_LIMIT,
  passwordReset: PASSWORD_RESET_RATE_LIMIT,
  registration: REGISTRATION_RATE_LIMIT,
};
