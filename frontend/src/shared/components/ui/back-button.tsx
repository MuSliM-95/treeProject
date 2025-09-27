'use client'

import { Button } from '..'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
	className?: string
	onClick?: () => void
}

export const BackButton: React.FC<Props> = ({ className, onClick }) => {
	const { t } = useTranslation()
	return (
		<Button
			onClick={onClick}
			className='text-muted-foreground absolute top-2 left-2 text-sm hover:underline'
			variant='ghost'
		>
			← {t('back')}
		</Button>
	)
}
