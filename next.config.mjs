// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  compiler: {
    styledComponents: true,
  },

  swcMinify: true,
}

export default nextConfig
