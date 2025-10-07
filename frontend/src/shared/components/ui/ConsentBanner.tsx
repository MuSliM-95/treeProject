'use client'

import { Button } from '..'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardFooter } from './card'

const COOKIE_NAME = 'user_consent'

export default function ConsentBanner() {
	// предполагаем, что переводы в common.json
	const [showBanner, setShowBanner] = useState(false)

	const { t, i18n } = useTranslation('common')

	useEffect(() => {
		i18n.changeLanguage('ru')
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
		<div className='fixed bottom-4 right-2.5 z-50  transform'>
			<Card className='w-[90vw] max-w-xl shadow-lg'>
				<CardContent>
					<p>{t('consent_message')}</p>
				</CardContent>
				<CardFooter className='flex justify-end'>
					<Button onClick={handleAccept}>
						{t('consent_accept')}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
