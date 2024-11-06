/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@invertase/firebase-stripe-payments"],
};

module.exports = nextConfig;
