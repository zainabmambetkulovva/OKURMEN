import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@okurmen/database'],
  
  // Server Components External Packages
  experimental: {
    serverComponentsExternalPackages: [
      'bcryptjs',
      'node-telegram-bot-api',
      '@prisma/client',
    ],
  },
  
  // Compression
  compress: true,
  
  // Output
  output: 'standalone',
};

export default nextConfig;
