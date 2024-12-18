/** @type {import('next').NextConfig} */
const nextConfig = {

  // experimental: {
  //   serverActions: {
  //     allowedOrigins: "*" ,
  //   },
  // },
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
