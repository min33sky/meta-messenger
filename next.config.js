/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['ac-p2.namu.la', 'platform-lookaside.fbsbx.com'],
  },
};

module.exports = nextConfig;
