'use client'

import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'

import { SpinnerOverlay } from '@/shared/components'

import { useFindTreeMutation } from '../../hooks/useFindTreeMutation'
import dynamic from 'next/dynamic'

interface IProps {
	token: string
}

export const TreeLinkDynamic = dynamic(() => import('@features/tree/components/ui/TreeLink').then(m => m.TreeLink), {
	ssr: false,
	loading:  () => <SpinnerOverlay className='size-10' /> ,
})

export const TreeLink: React.FC<IProps> = ({ token }) => {
	const { findTree, isPending } = useFindTreeMutation()
    const { t } = useTranslation('tree')
	useEffect(() => {
		findTree(token)
	}, [])

	return <div>{isPending && <SpinnerOverlay text={`${t('loading')}...`} />}</div>
}
