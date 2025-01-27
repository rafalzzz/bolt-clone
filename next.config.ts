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
    reactRemoveProperties: { properties: ['^data-testid$'] },
  },
};

module.exports = withNextIntl(config);
