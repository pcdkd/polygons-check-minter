/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env:{
    NEXT_PUBLIC_ALCHEMY_MUMBAI_KEY : process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_KEY,
    NEXT_PUBLIC_INFURA_POLYGON_KEY: process.env.NEXT_PUBLIC_INFURA_POLYGON_KEY,
  }
}

module.exports = nextConfig
