import { NextRequest, NextResponse } from 'next/server';

/**
 * Request Size Limit Middleware
 * 
 * Protects against:
 * - Large payload attacks
 * - Memory exhaustion
 * - Slow POST attacks
 */

const DEFAULT_MAX_SIZE = 1024 * 1024; // 1MB
const MAX_SIZE_BY_ENDPOINT: Record<string, number> = {
  '/api/courses': 100 * 1024, // 100KB for course data
  '/api/auth/signin': 10 * 1024, // 10KB for login
  '/api/auth/request-2fa': 10 * 1024,
  '/api/auth/verify-2fa': 10 * 1024,
  '/api/reviews': 50 * 1024, // 50KB for reviews
};

/**
 * Get max size for endpoint
 */
function getMaxSize(pathname: string): number {
  // Check exact match
  if (MAX_SIZE_BY_ENDPOINT[pathname]) {
    return MAX_SIZE_BY_ENDPOINT[pathname];
  }

  // Check prefix match
  for (const [endpoint, size] of Object.entries(MAX_SIZE_BY_ENDPOINT)) {
    if (pathname.startsWith(endpoint)) {
      return size;
    }
  }

  // Use environment variable or default
  const envMaxSize = process.env.MAX_REQUEST_SIZE;
  return envMaxSize ? parseInt(envMaxSize, 10) : DEFAULT_MAX_SIZE;
}

/**
 * Check if request body size exceeds limit
 */
export async function checkRequestSize(
  request: NextRequest
): Promise<{ valid: boolean; size?: number; maxSize?: number }> {
  // Only check POST, PUT, PATCH requests
  if (!['POST', 'PUT', 'PATCH'].includes(request.method)) {
    return { valid: true };
  }

  // Get Content-Length header
  const contentLength = request.headers.get('content-length');
  
  if (!contentLength) {
    // No Content-Length header - allow but log warning
    console.warn('⚠️  Request without Content-Length header:', request.url);
    return { valid: true };
  }

  const size = parseInt(contentLength, 10);
  const maxSize = getMaxSize(request.nextUrl.pathname);

  if (size > maxSize) {
    console.warn(
      `⚠️  Request size exceeded: ${size} bytes > ${maxSize} bytes for ${request.nextUrl.pathname}`
    );
    return { valid: false, size, maxSize };
  }

  return { valid: true, size, maxSize };
}

/**
 * Create 413 Payload Too Large response
 */
export function createPayloadTooLargeResponse(size: number, maxSize: number): NextResponse {
  return NextResponse.json(
    {
      error: 'Payload Too Large',
      message: `Request body size (${size} bytes) exceeds maximum allowed size (${maxSize} bytes)`,
      maxSize,
      receivedSize: size,
    },
    {
      status: 413,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
