/**
 * Structured Logging System
 * 
 * Provides consistent logging format for:
 * - Security events
 * - Rate limit violations
 * - Authentication failures
 * - API errors
 */

export type LogLevel = 'info' | 'warn' | 'error' | 'security';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  ip?: string;
  userId?: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Format log entry as JSON (production) or pretty (development)
   */
  private format(entry: LogEntry): string {
    if (this.isDevelopment) {
      // Pretty format for development
      const emoji = {
        info: 'ℹ️',
        warn: '⚠️',
        error: '❌',
        security: '🔒',
      }[entry.level];

      let log = `${emoji} [${entry.level.toUpperCase()}] ${entry.message}`;
      
      if (entry.context) {
        log += `\n  ${JSON.stringify(entry.context, null, 2)}`;
      }
      
      return log;
    }

    // JSON format for production (easy to parse)
    return JSON.stringify(entry);
  }

  /**
   * Log message
   */
  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    };

    const formatted = this.format(entry);

    switch (level) {
      case 'error':
      case 'security':
        console.error(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      default:
        console.log(formatted);
    }
  }

  /**
   * Info log
   */
  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context);
  }

  /**
   * Warning log
   */
  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context);
  }

  /**
   * Error log
   */
  error(message: string, context?: Record<string, any>) {
    this.log('error', message, context);
  }

  /**
   * Security event log (important!)
   */
  security(message: string, context?: Record<string, any>) {
    this.log('security', message, context);
  }
}

// Export singleton instance
export const logger = new Logger();

/**
 * Sanitize data for logging (remove sensitive info)
 */
export function sanitizeForLogging(data: any): any {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const sensitiveKeys = [
    'password',
    'passwordHash',
    'token',
    'accessToken',
    'refreshToken',
    'secret',
    'apiKey',
    'authorization',
    'cookie',
    'jwt',
  ];

  const sanitized = { ...data };

  for (const key of Object.keys(sanitized)) {
    const lowerKey = key.toLowerCase();
    
    if (sensitiveKeys.some(sk => lowerKey.includes(sk))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitizeForLogging(sanitized[key]);
    }
  }

  return sanitized;
}
