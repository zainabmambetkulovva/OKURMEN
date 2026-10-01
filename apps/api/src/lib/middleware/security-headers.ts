import { NextResponse } from 'next/server';

/**
 * Security Headers Configuration
 * 
 * Adds HTTP security headers to protect against common vulnerabilities
 */

export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Clickjacking protection
  response.headers.set('X-Frame-Options', 'DENY');

  // XSS Protection (legacy, but still good to have)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer Policy (privacy)
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy (disable unnecessary features)
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  );

  // HSTS (only in production with HTTPS)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Content Security Policy (basic version - safe for API)
  // NOTE: For web app, this needs to be more permissive
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'none'; frame-ancestors 'none'"
  );

  return response;
}

/**
 * Get security headers as object (for manual use)
 */
export function getSecurityHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
  };

  if (process.env.NODE_ENV === 'production') {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  return headers;
}
