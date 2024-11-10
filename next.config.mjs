import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','i.imgur.com','res.cloudinary.com',], // Add the hostname(s) here
  },
};

export default withNextVideo(nextConfig);