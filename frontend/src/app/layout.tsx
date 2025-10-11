// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

import '@/app/styles/globals.css'

import { GoogleAnalytics, MetaData } from '@/shared/components'
import { MainProvider } from '@/shared/providers'
import TranslationsProvider from '@/shared/providers/TranslationsProvider'
import initTranslations from '@/shared/utils/i18n/i18n'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

const i18nNamespaces = ['meta']

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<head></head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MainProvider>{children}</MainProvider>

				<GoogleAnalytics />
			</body>
		</html>
	)
}
