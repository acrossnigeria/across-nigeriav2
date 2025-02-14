import { withNextVideo } from "next-video/process";

const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'i.imgur.com', 'res.cloudinary.com'],
  },
  experimental: {
    turbo: true, // Disable Turbopack for testing
    outputFileTracing: true,
  },
};

export default withNextVideo(nextConfig);