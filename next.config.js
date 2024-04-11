/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["gildongmuu.s3.ap-northeast-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
