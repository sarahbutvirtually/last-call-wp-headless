/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "/Users/sarahclarke/Desktop/dev/personal/2025/00-web-portfolio/last-call-wp-headless",
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "last-call.local", pathname: "/**" },
      { protocol: "https", hostname: "last-call.local", pathname: "/**" },
    ],
  },
};

export default nextConfig;
