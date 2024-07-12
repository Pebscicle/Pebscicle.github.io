/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Outputs a Single-Page Application (SPA).
    reactStrictMode: true,
    distDir: './dist', // Changes the build output directory to `./dist/`.
    images: { unoptimized: true },
    experimental: {
      missingSuspenseWithCSRBailout: false, // The option you want to add
    },
  }
   
  export default nextConfig

