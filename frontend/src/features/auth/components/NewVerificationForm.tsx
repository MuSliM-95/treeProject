'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { SpinnerOverlay } from '@/shared/components'

import { useVerificationMutation } from '../hooks'

import { AuthWrapper } from './AuthWrapper'

export function NewVerificationForm() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const { t } = useTranslation('auth')

	const { verification } = useVerificationMutation()

	useEffect(() => {
		verification(token)
	}, [token])

	return (
		<AuthWrapper heading={t('auth-form.verify.title')}>
			<div>
				<SpinnerOverlay t={t} />
			</div>
		</AuthWrapper>
	)
}
