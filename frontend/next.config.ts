/** @type {import('next').NextConfig} */
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	output: 'standalone',
	experimental: {
		// missingSuspenseWithCSRBailout: false
	},
	env: {
		SERVER_URL: process.env.SERVER_URL
	},

	images: {git 
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
}

export default nextConfig
