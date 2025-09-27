'use client'
import React, { useEffect } from 'react'

import { Loading } from '@/shared/components'
import { useSearchParams } from 'next/navigation'
import { useEmailVerificationMutation } from '../hooks'

interface IProps {
	className?: string
}

export const NewEmail: React.FC<IProps> = ({ className }) => {

	const searchParams = useSearchParams()
	const token = searchParams.get('token')


	const { verification, isPending } = useEmailVerificationMutation()

	useEffect(() => {
		if(!token) {
			return 
		}
		verification(token)
	}, [token, searchParams])

	return (
		<div>
			<Loading />
		</div>
	)
}
