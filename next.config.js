/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "platform-lookaside.fbsbx.com",
      "links.papareact.com",
    ],
  },
};

module.exports = nextConfig;
