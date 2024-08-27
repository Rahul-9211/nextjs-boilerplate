/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  
    domains: ["images.unsplash.com"],
  },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
    reactStrictMode: true,
    async redirects() {
        return [
          {
            source: '/',
            destination: '/signin',
            permanent: false, // Use true if you want a 308 permanent redirect
          },
        ];
      },
    
};

export default nextConfig;
