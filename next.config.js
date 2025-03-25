/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'logo.clearbit.com',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
}

module.exports = nextConfig 