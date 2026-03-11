import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            },
            {
                protocol: 'https',
                hostname: 'logicmojo.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
            {
                protocol: 'https',
                hostname: 'chezasite.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost'
            }

        ],

        domains: ['localhost, via.placeholder.com', 'logicmojo.com', 'chezasite.com', 'i.pinimg.com']
    }

};

export default nextConfig;
