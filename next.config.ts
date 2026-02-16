import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Next.js <Image> to load images from your WordPress subdomain.
  // We include both the wp. subdomain (where WordPress lives) and the
  // original domain (in case any old image URLs remain in content).
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.beyonddisabilityclub.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "beyonddisabilityclub.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
