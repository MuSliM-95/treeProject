/** @type {import('next').NextConfig} */
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig: NextConfig  = {
  /* config options here */
  output: 'standalone',
  experimental: {
		// missingSuspenseWithCSRBailout: false
	},
	env: {
		SERVER_URL: process.env.SERVER_URL
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'avatars.yandex.net'
			}
		]
	}
};

const withNextIntl = createNextIntlPlugin('./src/shared/utils/i18n/request.ts');
export default withNextIntl(nextConfig);

