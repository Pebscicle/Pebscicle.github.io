/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
    experimental: {
      missingSuspenseWithCSRBailout: false, // The option you want to add
    },
  };
  
  module.exports = nextConfig;