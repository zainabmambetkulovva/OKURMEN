import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Get origin
    const origin = request.headers.get('origin');
    
    // Default localhost origins for development
    const defaultOrigins = [
      'http://localhost:3000', // Web Frontend
      'http://localhost:3001', // Student Portal
      'http://localhost:3002', // API same origin
      'http://localhost:3003', // Admin Panel
      'http://localhost:3004', // Employee Portal
    ];
    
    // Production origins from environment or hardcoded
    const productionOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : [
          'https://okurmen-admin.vercel.app',
          'https://okurmen-web.vercel.app',
          'https://okurmen-student.vercel.app',
          'https://okurmen-employee.vercel.app',
        ];
    
    const allowedOrigins = [...defaultOrigins, ...productionOrigins];
    
    // Check if origin is allowed
    const isAllowed = origin && (
      allowedOrigins.includes(origin) ||
      // Allow Vercel preview deployments for okurmen projects
      /^https:\/\/okurmen-(admin|web|student|employee)-[a-z0-9]+-[a-z0-9]+\.vercel\.app$/.test(origin)
    );

    // Handle preflight OPTIONS requests
    if (request.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 204 });
      
      if (isAllowed) {
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
        response.headers.set('Access-Control-Max-Age', '86400');
      }
      
      return response;
    }

    // Handle actual requests
    const response = NextResponse.next();

    if (isAllowed) {
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

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
