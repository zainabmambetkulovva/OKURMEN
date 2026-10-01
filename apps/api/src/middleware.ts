import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RateLimiter, getRateLimitConfig, getClientIp } from './lib/rate-limit';
import { addSecurityHeaders } from './lib/middleware/security-headers';
import { checkRequestSize, createPayloadTooLargeResponse } from './lib/middleware/request-size';

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'http://localhost:3000', // Web Frontend
  'http://localhost:3001', // Student Portal
  'http://localhost:3002', // API same origin
  'http://localhost:3003', // Admin Panel
  'http://localhost:3004', // Employee Portal (old)
  'http://localhost:3005', // Employee Portal (new)
  // Production URLs
  'https://okurmen.vercel.app',
  'https://okurmen-admin.vercel.app',
  'https://okurmen-employee.vercel.app',
  // Add your custom domains here when ready
];

/**
 * Add CORS headers to response
 */
function addCORSHeaders(response: NextResponse, origin: string | null) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );
  }
}

export async function middleware(request: NextRequest) {
  // ===== REQUEST SIZE CHECK =====
  const sizeCheck = await checkRequestSize(request);
  if (!sizeCheck.valid && sizeCheck.size && sizeCheck.maxSize) {
    return createPayloadTooLargeResponse(sizeCheck.size, sizeCheck.maxSize);
  }

  // Only process API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const origin = request.headers.get('origin');

  // ===== HANDLE PREFLIGHT OPTIONS REQUESTS =====
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    addCORSHeaders(response, origin);
    response.headers.set('Access-Control-Max-Age', '86400');
    return response;
  }

  // ===== RATE LIMITING =====
  // Skip rate limiting for health check
  if (request.nextUrl.pathname !== '/api/health') {
    const rateLimitConfig = getRateLimitConfig(request.nextUrl.pathname, false);

    if (rateLimitConfig) {
      // Determine identifier (IP-based)
      const identifier = getClientIp(request);

      // Check if identifier is blocked
      const isBlocked = await RateLimiter.isBlocked(identifier, rateLimitConfig);
      if (isBlocked) {
        const response = NextResponse.json(
          {
            error: 'Access temporarily blocked due to too many requests',
            retryAfter: 3600, // 1 hour
          },
          {
            status: 429,
            headers: {
              'Retry-After': '3600',
              'X-RateLimit-Blocked': 'true',
            },
          }
        );
        addSecurityHeaders(response);
        addCORSHeaders(response, origin);
        return response;
      }

      // Check rate limit
      const rateLimitResult = await RateLimiter.checkLimit(identifier, rateLimitConfig);

      if (!rateLimitResult.success) {
        const response = NextResponse.json(
          {
            error: 'Too many requests',
            message: 'Please try again later',
            retryAfter: rateLimitResult.retryAfter,
          },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': rateLimitResult.limit.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': rateLimitResult.reset.toString(),
              'Retry-After': (rateLimitResult.retryAfter || 60).toString(),
            },
          }
        );
        addSecurityHeaders(response);
        addCORSHeaders(response, origin);
        return response;
      }

      // Add rate limit headers to successful response
      const response = NextResponse.next();
      response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
      response.headers.set('X-RateLimit-Reset', rateLimitResult.reset.toString());
      
      // Add security headers
      addSecurityHeaders(response);
      
      // Add CORS headers
      addCORSHeaders(response, origin);

      return response;
    }
  }

  // ===== NO RATE LIMIT APPLIED (health check or unmatched routes) =====
  const response = NextResponse.next();
  
  // Add security headers to all API responses
  addSecurityHeaders(response);
  
  // Add CORS headers
  addCORSHeaders(response, origin);

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
