/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "github.com",
      },
    ],
  },
  allowedDevOrigins: ["*.ngrok-free.app"],
};

module.exports = nextConfig;
