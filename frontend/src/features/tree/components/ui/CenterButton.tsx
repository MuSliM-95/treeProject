'use client'

import { useReactFlow } from '@xyflow/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/components'

interface Props {
	className?: string
}

export const CenterButton: React.FC<Props> = ({ className }) => {
	const { fitView } = useReactFlow()
	const { t } = useTranslation('tree')

	const handleClick = () => {
		fitView({ padding: 0.5, duration: 800 })
	}
	
	return (
		<Button type='button' onClick={handleClick} className={className}>
			{t('button_center.center')}
		</Button>
	)
}
