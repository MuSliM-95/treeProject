import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'

import '@/app/styles/globals.css'

import { MainProvider } from '@/shared/providers'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta')

	return {
		title: t('title'),
		description: t('description'),
		icons: {
			icon: '/images/share-2.svg',
			shortcut: '/images/share-2.svg',
			apple: '/images/share-2.svg'
		},
		verification: {
			google: 'K4NjTpnl-Yu4tWYOS-afGUtZA3PIIZM-AH30tKuJrzo',
			yandex: '016d187c35064f23'
		}
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
