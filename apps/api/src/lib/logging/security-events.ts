import { logger, sanitizeForLogging } from './logger';

/**
 * Security Event Tracking
 * 
 * Logs security-relevant events for monitoring and forensics
 */

export interface SecurityEvent {
  type: SecurityEventType;
  ip: string;
  endpoint?: string;
  userId?: string;
  email?: string;
  reason?: string;
  metadata?: Record<string, any>;
}

export type SecurityEventType =
  | 'rate_limit_exceeded'
  | 'rate_limit_blocked'
  | 'login_failed'
  | 'login_success'
  | '2fa_failed'
  | '2fa_success'
  | 'suspicious_activity'
  | 'payload_too_large'
  | 'invalid_token'
  | 'unauthorized_access';

/**
 * Log security event
 */
export function logSecurityEvent(event: SecurityEvent) {
  const context = sanitizeForLogging({
    type: event.type,
    ip: event.ip,
    endpoint: event.endpoint,
    userId: event.userId,
    email: event.email,
    reason: event.reason,
    ...event.metadata,
  });

  logger.security(`Security Event: ${event.type}`, context);

  // TODO: In production, send to monitoring service (e.g., Sentry, Datadog)
  // TODO: Trigger alerts for critical events
}

/**
 * Log rate limit violation
 */
export function logRateLimitViolation(ip: string, endpoint: string, limit: number) {
  logSecurityEvent({
    type: 'rate_limit_exceeded',
    ip,
    endpoint,
    metadata: { limit },
  });
}

/**
 * Log blocked request (after multiple violations)
 */
export function logBlockedRequest(ip: string, endpoint: string, reason: string) {
  logSecurityEvent({
    type: 'rate_limit_blocked',
    ip,
    endpoint,
    reason,
  });
}

/**
 * Log failed login attempt
 */
export function logFailedLogin(email: string, ip: string, reason: string) {
  logSecurityEvent({
    type: 'login_failed',
    ip,
    email,
    endpoint: '/api/auth/signin',
    reason,
  });
}

/**
 * Log successful login
 */
export function logSuccessfulLogin(userId: string, email: string, ip: string) {
  logSecurityEvent({
    type: 'login_success',
    ip,
    userId,
    email,
    endpoint: '/api/auth/signin',
  });
}

/**
 * Log failed 2FA attempt
 */
export function logFailed2FA(email: string, ip: string) {
  logSecurityEvent({
    type: '2fa_failed',
    ip,
    email,
    endpoint: '/api/auth/verify-2fa',
  });
}

/**
 * Log suspicious activity
 */
export function logSuspiciousActivity(ip: string, endpoint: string, reason: string, metadata?: Record<string, any>) {
  logSecurityEvent({
    type: 'suspicious_activity',
    ip,
    endpoint,
    reason,
    metadata,
  });
}

/**
 * Log payload too large
 */
export function logPayloadTooLarge(ip: string, endpoint: string, size: number, maxSize: number) {
  logSecurityEvent({
    type: 'payload_too_large',
    ip,
    endpoint,
    metadata: { size, maxSize },
  });
}
