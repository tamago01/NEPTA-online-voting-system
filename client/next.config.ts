/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    serverActions: {
      allowedOrigins: ["https://nepta-online-voting-system.onrender.com",
        "https://nepta.onrender.com","*"
      ],
    },
  },
  trailingSlash: false,
  images: {
    domains: [
      "img.freepik.com",
      "storageapi.fleek.co",
      "gateway.pinata.cloud",
      "localhost",
      "example.com",
    ],
  },
};
export default nextConfig;
