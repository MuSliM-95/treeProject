'use client'

import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { BackButton, Button, Card, ScrollArea } from '@/shared/components'

export const InfoNavProvider: React.FC<PropsWithChildren<unknown>> = ({
	children
}) => {
	const { t } = useTranslation()

	const toc = t('homepage.infoPage', { returnObjects: true }) as Record<
		string,
		string
	>

	return (
		<div className='flex gap-6'>
			{/* Левая колонка: навигация */}
			<Card className='sticky top-4 self-start rounded-lg border-gray-200'>
				<ScrollArea  className='h-[80vh] p-4'>
					<nav className='space-y-2'>
						{Object.entries(toc).map(([key, text]) => (
							<Link
								key={key}
								href={`/${key}`}
								className='block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
							>
								{text}
							</Link>
						))}
					</nav>
				</ScrollArea>
			</Card>

			{/* Правая колонка: контент */}
			<div className='flex-1'>
				<Link href='/' className='fixed top-2 left-2'>
					<BackButton />
				</Link>

				{children}
			</div>
		</div>
	)
}
