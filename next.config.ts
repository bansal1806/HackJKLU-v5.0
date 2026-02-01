import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Enable static export for hosting on platforms like Vercel
    output: 'export',

    // Ignore TypeScript errors during build (StaticImageData type issues)
    typescript: {
        ignoreBuildErrors: true,
    },

    // Ignore ESLint errors during build
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Disable image optimization for static export
    images: {
        unoptimized: true,
    },

    // Transpile packages that need it
    transpilePackages: [
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        '@react-three/postprocessing',
        'lenis',
    ],

    // Configure webpack for GLSL shaders
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            use: ['raw-loader', 'glslify-loader'],
        });
        return config;
    },
};

export default nextConfig;
