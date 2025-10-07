'use client'

import { Button } from '..'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

import { Card, CardContent, CardFooter } from './card'

const COOKIE_NAME = 'user_consent'

export default function ConsentBanner() {
	const { t, i18n } = useTranslation('common')
	const pathname = usePathname()
	// предполагаем, что переводы в common.json
	const [showBanner, setShowBanner] = useState(false)
	useEffect(() => {
		const lang = pathname.split('/')[1]
		i18n.changeLanguage(lang)
		const consent = localStorage.getItem(COOKIE_NAME)
		if (!consent) setShowBanner(true)
	}, [])

	const handleAccept = () => {
		localStorage.setItem(COOKIE_NAME, 'true')
		setShowBanner(false)
		loadAnalyticsScripts()
	}

	const loadAnalyticsScripts = () => {
		if (typeof window === 'undefined') return

		window.dataLayer = window.dataLayer || []
		function gtag(...args: any[]) {
			window.dataLayer.push(args)
		}
		gtag('js', new Date())
		gtag('config', 'GA_MEASUREMENT_ID')

		const script = document.createElement('script')
		script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.googleId}`
		script.async = true
		document.body.appendChild(script)
	}

	if (!showBanner) return null

	return (
		<AnimatePresence>
			{showBanner && (
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 30 }}
					transition={{ duration: 0.3 }}
					className='fixed right-4 bottom-6 z-50'
				>
					<Card className='max-w-80 rounded-xl border border-gray-200 bg-white shadow-2xl dark:bg-gray-900'>
						<CardContent className='p-4'>
							<h3 className='mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100'>
								{t('title')}
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-300'>
								{t('description')}{' '}
								<a
									href='/terms#rule-2'
									className='text-blue-600 hover:underline dark:text-blue-400'
									target='_blank'
								>
									{t('consent_learn_more')}
								</a>
							</p>
						</CardContent>
						<CardFooter className='flex justify-end p-4 pt-0'>
							<Button
								onClick={handleAccept}
								className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
							>
								{t('consent_accept')}
							</Button>
						</CardFooter>
					</Card>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
