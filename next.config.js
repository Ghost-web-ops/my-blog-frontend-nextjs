/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // للسماح بالصور من الخادم المحلي أثناء التطوير
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // للسماح بالصور من خادم Railway بعد النشر (مهم جدًا)
      {
        protocol: 'https',
        hostname: 'my-blog-backend-production-b97d.up.railway.app',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;