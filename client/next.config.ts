/** @type {import('next').NextConfig} */
const nextConfig = {
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
