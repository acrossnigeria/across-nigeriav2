import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','i.imgur.com','res.cloudinary.com',], // Add the hostname(s) here
  },
  experimental: {
    turbo: true,
    outputFileTracing:true,
  }
};

export default withNextVideo(nextConfig);