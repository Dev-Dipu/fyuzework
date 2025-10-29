/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instagram.fhyd2-3.fna.fbcdn.net',        // This covers all Instagram CDN domains
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',     
      }
    ],
  },
};

export default nextConfig;
