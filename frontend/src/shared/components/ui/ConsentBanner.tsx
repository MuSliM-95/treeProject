'use client'

import { Button } from '..'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

import { Card, CardContent, CardFooter } from './card'

export default function ConsentBanner() {
	const { t, i18n } = useTranslation('common')
	const pathname = usePathname()

	const [showBanner, setShowBanner] = useState(false)
	useEffect(() => {			
		const lang = pathname.split('/')[1]
		i18n.changeLanguage(lang)
		const consent = localStorage.getItem('consent')
		if (!consent) setShowBanner(true)
	}, [])

	const handleAccept = () => {
		window.gtag?.('consent', 'update', {
		  ad_storage: 'granted',
		  analytics_storage: 'granted',
		  ad_user_data: 'granted',
		  ad_personalization: 'granted'
		});

		localStorage.setItem('consent', 'granted');
		setShowBanner(false);
	  };

	  const handleDecline = () => {
		window.gtag?.('consent', 'update', {
		  ad_storage: 'denied',
		  analytics_storage: 'denied',
		  ad_user_data: 'denied',
		  ad_personalization: 'denied'
		});
	  
		localStorage.setItem('consent', 'denied');
		setShowBanner(false);
	  };

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
						<CardFooter className='flex justify-between p-4 pt-0'>
							<Button
								onClick={handleAccept}
								className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
							>
								{t('consent_accept')}
							</Button>
							<Button
								onClick={handleDecline}
								className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
							>
								{t('consent_decline')}
							</Button>
						</CardFooter>
					</Card>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
