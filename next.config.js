/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Add webpack fallbacks for server-only modules like 'fs', 'path', 'os'
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Optional: Enable experimental or image settings
  images: {
    domains: ['res.cloudinary.com'], // allows Cloudinary images
  },

  // Optional: Improve build output readability
  eslint: {
    ignoreDuringBuilds: true, // prevents eslint errors from stopping builds
  },

  typescript: {
    ignoreBuildErrors: true, // allows deployment even with TS errors
  },
};

module.exports = nextConfig;
