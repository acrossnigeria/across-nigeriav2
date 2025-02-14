import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'i.imgur.com', 'res.cloudinary.com'],
  },
  experimental: {
    turbo: false,
    outputFileTracing: true,
  },
  swcMinify: false, // Disable SWC minification
};

export default withNextVideo(nextConfig);