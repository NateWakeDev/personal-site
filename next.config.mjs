// next.config.mjs
export default {
    output: 'export',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-site/' : '',
    images: {
      unoptimized: true, // This is to handle images without optimization for static exports
    },
  };
  