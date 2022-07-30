const webpack = require('webpack');

const { parsed: env } = require('dotenv').config({
  path: './.env.local',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx'],
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(env));
    return config;
  },
};

module.exports = nextConfig;
