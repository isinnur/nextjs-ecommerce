/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{hostname: "images.unsplash.com"}],
    },
    // Bu özellik, sunucu taraflı işlemleri gerçekleştirmek için kullanılır.
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig
