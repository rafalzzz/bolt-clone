import { NextConfig } from 'next';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withNextIntl = require('next-intl/plugin')();

const config: NextConfig = {
  async headers() {
    return [
      {
        source: '/:locale/driver',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
  compiler: {
    ...(process.env.NODE_ENV === 'production'
      ? {
          reactRemoveProperties: { properties: ['^data-testid$'] },
        }
      : {}),
  },
  env: {
    NEXT_PUBLIC_REGISTER_DRIVER_TOKEN_SECRET_KEY: process.env.REGISTER_DRIVER_TOKEN_SECRET_KEY,
    NEXT_PUBLIC_ENVIRONMENT: process.env.ENVIRONMENT,
    NEXT_PUBLIC_TF_BACKEND: process.env.TF_BACKEND,
  },
};

module.exports = withNextIntl(config);
