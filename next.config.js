const { createProxyMiddleware } = require("http-proxy-middleware");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://3.38.76.39:8080/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
