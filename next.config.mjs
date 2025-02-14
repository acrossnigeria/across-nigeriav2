import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','i.imgur.com','res.cloudinary.com',], // Add the hostname(s) here
  },
  experimental: {
    turbo: false,
    outputFileTracing:true,
  },
  async headers() {
    return [
      {
        source: '/', // Applies to the homepage
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0', // Disable caching
          },
        ],
      },
    ];
  },
};

export default withNextVideo(nextConfig);