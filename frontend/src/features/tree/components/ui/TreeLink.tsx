'use client'

import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'

import { SpinnerOverlay } from '@/shared/components'

import { useFindTreeMutation } from '../../hooks/useFindTreeMutation'

interface IProps {
	token: string
}

export const TreeLink: React.FC<IProps> = ({ token }) => {
	const { findTree, isPending } = useFindTreeMutation()
    const { t } = useTranslation('tree')
	useEffect(() => {
		findTree(token)
	}, [])

	return <div>{isPending && <SpinnerOverlay t={t} />}</div>
}
