/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer'
import { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
})


const nextConfig: NextConfig = withBundleAnalyzer({
	/* config options here */
	output: 'standalone',
	experimental: {
		// missingSuspenseWithCSRBailout: false
	},
	env: {
		SERVER_URL: process.env.SERVER_URL,
		NEXT_PUBLIC_GTAG_ID: process.env.NEXT_PUBLIC_GTAG_ID
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'avatars.yandex.net'
			}
		]
	}
})

export default nextConfig
