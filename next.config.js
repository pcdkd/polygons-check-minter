/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  env: {
    ALCHEMY_MUMBAI_API_URL: "process.env.https://polygon-mumbai.g.alchemy.com/v2/9RfQQNJD9vFpKfZYNUXsNYhz1SLEPc3g",
    ALCHEMY_MUMBAI_API_KEY: "process.env.9RfQQNJD9vFpKfZYNUXsNYhz1SLEPc3g",
  },
};
