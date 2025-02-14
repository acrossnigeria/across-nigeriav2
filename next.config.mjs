import { withNextVideo } from "next-video/process";

const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'i.imgur.com', 'res.cloudinary.com'],
  },
  experimental: {
    turbo: false, // Disable Turbopack for testing
    outputFileTracing: true,
  },
  swcMinify: false, // Disable minification for debugging
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