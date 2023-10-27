/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_VT_API_KEY: process.env.NEXT_PUBLIC_VT_API_KEY,
  },
}

module.exports = nextConfig
