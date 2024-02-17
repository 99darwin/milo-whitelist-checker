/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/milo',
                destination: 'https://warpcast.com/~/channel/milo',
                permanent: false
            },
            {
                source: '/dividoge',
                destination: 'https://dividoge.com',
                permanent: false
            }
        ]
    },
    env: {
        NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
        HUB_GRPC_URL: process.env.HUB_GRPC_URL,
        HUB_HTTP_URL: process.env.HUB_HTTP_URL,
        BASE_URL: process.env.BASE_URL,
        GATEWAY_URL: process.env.GATEWAY_URL,
        AIRSTACK_API_KEY: process.env.AIRSTACK_API_KEY,
    }
};

export default nextConfig;
