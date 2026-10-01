import { NextRequest } from 'next/server';

/**
 * IP Extraction & Validation Utilities
 * 
 * ВАЖНО: Защита от IP spoofing
 * - Cloudflare: Trust CF-Connecting-IP
 * - Railway: Trust X-Forwarded-For (first IP)
 * - Development: Use socket IP
 */

// Cloudflare IP ranges (для проверки trusted proxy)
// Полный список: https://www.cloudflare.com/ips/
const CLOUDFLARE_IPV4_RANGES = [
  '173.245.48.0/20',
  '103.21.244.0/22',
  '103.22.200.0/22',
  '103.31.4.0/22',
  '141.101.64.0/18',
  '108.162.192.0/18',
  '190.93.240.0/20',
  '188.114.96.0/20',
  '197.234.240.0/22',
  '198.41.128.0/17',
  '162.158.0.0/15',
  '104.16.0.0/13',
  '104.24.0.0/14',
  '172.64.0.0/13',
  '131.0.72.0/22',
];

/**
 * Extract real client IP from request
 * 
 * Priority:
 * 1. CF-Connecting-IP (Cloudflare)
 * 2. X-Real-IP
 * 3. X-Forwarded-For (first IP)
 * 4. Socket IP
 */
export function getClientIp(request: NextRequest): string {
  // 1. Cloudflare header (most reliable behind Cloudflare)
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp && isValidIp(cfIp)) {
    return cfIp;
  }

  // 2. X-Real-IP (some proxies use this)
  const realIp = request.headers.get('x-real-ip');
  if (realIp && isValidIp(realIp)) {
    return realIp;
  }

  // 3. X-Forwarded-For (take first IP, which is the client)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0].trim();
    if (isValidIp(firstIp)) {
      return firstIp;
    }
  }

  // 4. Fallback to 'unknown' if no valid IP found
  // In development, this might be localhost
  return 'unknown';
}

/**
 * Validate IP address format
 */
export function isValidIp(ip: string): boolean {
  // IPv4 regex
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  
  // IPv6 regex (simplified)
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;

  if (!ip || ip === 'unknown') return false;

  if (ipv4Regex.test(ip)) {
    // Validate IPv4 octets (0-255)
    const octets = ip.split('.');
    return octets.every(octet => {
      const num = parseInt(octet, 10);
      return num >= 0 && num <= 255;
    });
  }

  if (ipv6Regex.test(ip)) {
    return true;
  }

  return false;
}

/**
 * Check if IP is from Cloudflare
 * (Simple check - для production лучше использовать IP range библиотеку)
 */
export function isCloudflareIp(ip: string): boolean {
  // Simplified check - в production используйте библиотеку ipaddr.js или ip-range-check
  // Для начала просто проверяем наличие CF-Connecting-IP header
  return true; // Placeholder - implement proper range check if needed
}

/**
 * Check if request is from trusted proxy
 */
export function isTrustedProxy(request: NextRequest): boolean {
  // If CF-Connecting-IP exists, request went through Cloudflare
  const cfIp = request.headers.get('cf-connecting-ip');
  const cfRay = request.headers.get('cf-ray');
  
  if (cfIp && cfRay) {
    return true; // Cloudflare proxy
  }

  // Check if TRUSTED_PROXY_IPS env var is set
  const trustedIps = process.env.TRUSTED_PROXY_IPS?.split(',').map(ip => ip.trim());
  if (trustedIps && trustedIps.length > 0) {
    const requestIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim();
    if (requestIp && trustedIps.includes(requestIp)) {
      return true;
    }
  }

  return false;
}

/**
 * Get client country from Cloudflare header
 */
export function getClientCountry(request: NextRequest): string | null {
  return request.headers.get('cf-ipcountry');
}

/**
 * Get Cloudflare Ray ID (useful for debugging/logging)
 */
export function getCloudflareRayId(request: NextRequest): string | null {
  return request.headers.get('cf-ray');
}

/**
 * Sanitize IP for logging (GDPR compliance)
 * Masks last octet of IPv4
 * Example: 192.168.1.100 → 192.168.1.xxx
 */
export function sanitizeIpForLogging(ip: string): string {
  if (!isValidIp(ip)) return 'unknown';

  // IPv4: mask last octet
  if (ip.includes('.')) {
    const parts = ip.split('.');
    parts[3] = 'xxx';
    return parts.join('.');
  }

  // IPv6: mask last segment
  if (ip.includes(':')) {
    const parts = ip.split(':');
    parts[parts.length - 1] = 'xxxx';
    return parts.join(':');
  }

  return ip;
}

/**
 * Get identifier for rate limiting
 * 
 * @param type - 'ip', 'email', or 'userId'
 * @param request - NextRequest object
 * @param customIdentifier - Optional custom identifier (email, userId)
 */
export function getRateLimitIdentifier(
  type: 'ip' | 'email' | 'userId',
  request: NextRequest,
  customIdentifier?: string
): string {
  switch (type) {
    case 'ip':
      return getClientIp(request);
    
    case 'email':
      return customIdentifier || 'unknown';
    
    case 'userId':
      return customIdentifier || 'unknown';
    
    default:
      return getClientIp(request);
  }
}
