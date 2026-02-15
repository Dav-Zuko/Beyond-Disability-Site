import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Next.js <Image> to load images from your WordPress site.
  // Without this, you'd get an error when trying to display
  // featured images or any media uploaded to WordPress.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beyonddisabilityclub.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
