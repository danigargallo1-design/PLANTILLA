/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Esto ignorará los errores de tipos en el build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Esto también evitará que errores de linting paren el despliegue
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
