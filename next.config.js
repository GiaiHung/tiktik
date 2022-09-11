/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.tgdd.vn', 'www.hollywoodreporter.com'],
  },
}

module.exports = nextConfig
