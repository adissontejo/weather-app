const webpack = require('webpack');

const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx'],
  images: {
    domains: ['openweathermap.org'],
  },
  i18n: {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
  },
};

module.exports = nextConfig;
