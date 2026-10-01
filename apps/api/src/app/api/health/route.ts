import { NextResponse } from 'next/server';
import { testRedisConnection } from '@/lib/rate-limit/upstash-client';
import { prisma } from '@okurmen/database';

/**
 * Health Check Endpoint
 * 
 * Used by:
 * - Railway health checks
 * - Monitoring systems
 * - Load balancers
 * 
 * NO rate limiting on this endpoint
 */

export async function GET() {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      redis: 'unknown',
      database: 'unknown',
    },
  };

  try {
    // Check Redis connection
    const redisHealthy = await testRedisConnection();
    healthCheck.checks.redis = redisHealthy ? 'healthy' : 'unhealthy';

    // Check Database connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      healthCheck.checks.database = 'healthy';
    } catch (dbError) {
      console.error('Database health check failed:', dbError);
      healthCheck.checks.database = 'unhealthy';
    }

    // Determine overall status
    const allHealthy = Object.values(healthCheck.checks).every(check => check === 'healthy');
    healthCheck.status = allHealthy ? 'ok' : 'degraded';

    // Return appropriate status code
    const statusCode = allHealthy ? 200 : 503;

    return NextResponse.json(healthCheck, { status: statusCode });
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 503 }
    );
  }
}
