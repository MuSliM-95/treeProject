'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { SpinnerOverlay } from '@/shared/components'

import { useVerificationMutation } from '../hooks'

import { AuthWrapper } from './AuthWrapper'
import dynamic from 'next/dynamic'

export const NewVerificationFormDynamic = dynamic(() => import('@features/auth/components/NewVerificationForm').then(m => m.NewVerificationForm), {
	ssr: false,
	loading: () => <SpinnerOverlay className='size-10' />
})

export function NewVerificationForm() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const { t } = useTranslation('auth')

	const { verification, isPending } = useVerificationMutation()

	useEffect(() => {
		verification(token)
	}, [token])

	return (
		<AuthWrapper heading={t('auth-form.verify.title')}>
			<div>
				{isPending && <SpinnerOverlay text={`${t('loading')}...`} />}
			</div>
		</AuthWrapper>
	)
}
