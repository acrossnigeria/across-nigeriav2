import { withNextVideo } from "next-video/process";

const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'i.imgur.com', 'res.cloudinary.com'],
  },
  // outputFileTracingIncludes: { },
};

export default withNextVideo(nextConfig);