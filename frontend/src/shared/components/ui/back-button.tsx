import { cn } from '@/shared/utils'
import { Button } from '..'
import React from 'react'
import { TFunction } from 'i18next'

interface Props {
	className?: string
	onClick?: () => void
	t:TFunction
}

export const BackButton: React.FC<Props> = ({ className, onClick, t }) => {
	
	return (
		<Button
			onClick={onClick}
			className={cn('text-muted-foreground absolute top-2 left-2 text-sm hover:underline', className)}
			variant='ghost'
		>
			← {t('back')}
		</Button>
	)
}
