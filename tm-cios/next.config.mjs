/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ['localhost:3000', 'cios.tmsa.ind.br'],
      allowedOrigins: ['localhost:3000', 'cios.tmsa.ind.br'],
    },
  },
};

export default nextConfig;
