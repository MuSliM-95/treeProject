'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/components'

import { SpinnerOverlay } from '../../../../shared/components/ui/SpinnerOverlay'

export function FeedbackForm() {
	const router = useRouter()
	const { t, i18n } = useTranslation('tree')
	const [loading, setLoading] = useState(true)

	return (
		<>
			{loading && <SpinnerOverlay t={t} />}
			<div className='mx-auto'>
				<Button
					onClick={() => router.back()}
					className='text-muted-foreground text-sm hover:underline'
					variant='ghost'
				>
					← {t('feedback-form.back')}
				</Button>

				<iframe
					src={
						i18n.language === 'ru'
							? 'https://docs.google.com/forms/d/e/1FAIpQLScXmJgVlRvifoWZiFv8Y-YhUd2RN7nlHzsxxQLN43l3OtmBow/viewform?embedded=true'
							: 'https://docs.google.com/forms/d/e/1FAIpQLSdF9bFSfaGOreMUWDLHyNRH3rNYfYO13sRRnSPHdenFEnb2wA/viewform?usp=header'
					}
					className='h-[95vh] w-full'
					onLoad={() => setLoading(false)}
				></iframe>
			</div>
		</>
	)
}
