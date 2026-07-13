/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portlandantiquesmall.com',
      },
    ],
  },
}

module.exports = nextConfig
