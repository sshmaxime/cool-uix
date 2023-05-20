/** @type {import('next').NextConfig} */

const withSvgr = require("next-plugin-svgr");

module.exports = withSvgr({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
});
