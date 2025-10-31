import { Button } from '..'
import { TFunction } from 'i18next'
import React from 'react'

import { cn } from '@/shared/utils'
import Link from 'next/link'

interface Props {
	className?: string
	onClick?: () => void
	t: TFunction
	path: string
}

export const BackButton: React.FC<Props> = ({
	className,
	onClick,
	t,
	path
}) => {
	return (
		<Button
			onClick={onClick}
			className={cn(
				'text-muted-foreground absolute top-2  left-2 text-sm hover:underline',
				className
			)}
			variant='ghost'
		>
			<Link
				href={path}
				className='flex items-center gap-2 rounded-md text-gray-700 transition-colors hover:text-gray-900'
			>
				← {t('back')}
			</Link>
		</Button>
	)
}
