/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO 최적화
  poweredByHeader: false,

  // 성능 최적화
  experimental: {
    optimizePackageImports: ["react-markdown", "lucide-react"],
  },

  // 이미지 최적화
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },

  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 리다이렉트 설정
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
