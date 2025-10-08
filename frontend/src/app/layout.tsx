// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'

import '@/app/styles/globals.css'

import { MainProvider } from '@/shared/providers'
import Link from 'next/link'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<head>
		     	<Link rel="icon" href="https://example.com/favicon.ico" type="image/svg+xml" />
				<Script
					strategy='afterInteractive'
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
				/>
				<Script id='gtag-init' strategy='afterInteractive'>
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied'
            });

            gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');
          `}
				</Script>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
