// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  distDir: 'build',
  compiler: {
    styledComponents: true,
  },
}

export default nextConfig
