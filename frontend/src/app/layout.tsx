// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

import '@/app/styles/globals.css'

import { GoogleAnalytics } from '@/shared/components'
import { MainProvider } from '@/shared/providers'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<head>
				<meta name='verify-admitad' content='cd19109cf6' />
				{/* <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /> */}
				{/* <link rel="apple-touch-icon" href="/icons/apple-icon.png" /> */}
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MainProvider>{children}</MainProvider>
				<GoogleAnalytics />
			</body>
		</html>
	)
}
