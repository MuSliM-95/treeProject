'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useVerificationMutation } from '../hooks'
import { AuthWrapper } from './AuthWrapper'
import { Loading } from '@/shared/components'
import { useTranslation } from 'react-i18next'

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
				<Loading />
			</div>
		</AuthWrapper>
	)
}
