/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    if (!options.isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
module.exports = nextConfig;
