'use client'
import React, { useEffect } from 'react'

import { Loading, SpinnerOverlay } from '@/shared/components'
import { useSearchParams } from 'next/navigation'
import { useEmailVerificationMutation } from '../hooks'
import { useTranslation } from 'react-i18next'

interface IProps {
	className?: string
}

export const NewEmail: React.FC<IProps> = ({ className }) => {

	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const { t } = useTranslation('auth')


	const { verification, isPending } = useEmailVerificationMutation()

	useEffect(() => {
		if(!token) {
			return 
		}
		verification(token)
	}, [token, searchParams])

	return (
		<div>
			<SpinnerOverlay t={ t } />
		</div>
	)
}
