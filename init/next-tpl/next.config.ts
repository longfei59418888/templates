import type { NextConfig } from 'next';
import path from 'path';
import dotenv from 'dotenv';
import createNextIntlPlugin from 'next-intl/plugin';

const envFile = `./.env.${process.env.APP_ENV || 'production'}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });
const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    API_URL: process.env.API_URL || '',
    APP_URL: process.env.APP_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    APP_URL_WORDPRESS: process.env.APP_URL_WORDPRESS,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '****',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '****',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },
    ],
  },
};

export default createNextIntlPlugin()(nextConfig);
