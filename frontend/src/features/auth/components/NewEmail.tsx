'use client'

import { AuthWrapper } from '.'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Loading, SpinnerOverlay } from '@/shared/components'

import { useEmailVerificationMutation } from '../hooks'

interface IProps {
	className?: string
}

export const NewEmail: React.FC<IProps> = ({ className }) => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const { t } = useTranslation('auth')

	const { verification, isPending } = useEmailVerificationMutation()

	useEffect(() => {
		if (!token) {
			return
		}
		verification(token)
	}, [token, searchParams])

	return (
		<AuthWrapper heading={t('auth-form.verify.title')}>
			{isPending && <SpinnerOverlay t={t} />}
		</AuthWrapper>
	)
}
