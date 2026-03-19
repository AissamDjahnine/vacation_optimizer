/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: false,
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.14:3000",
  ],
  async redirects() {
    return [
      {
        source: "/en/planifier-annee/:year(\\d{4})",
        destination: "/en/plan-year/:year",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
