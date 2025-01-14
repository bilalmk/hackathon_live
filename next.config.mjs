/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            protocol:"https",
            hostname:"cdn.sanity.io",
            pathname: '/images/fo3vlzqb/production/**',
        }]
    }
};

export default nextConfig;
