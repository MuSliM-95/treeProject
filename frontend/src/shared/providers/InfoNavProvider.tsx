import Link from 'next/link'
import React, { ReactNode } from 'react'

import {
	BackButton,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components'
import { TFunction } from 'i18next'

interface IInfoNavProvider {
	children: ReactNode
	t: TFunction
}

export const InfoNavProvider: React.FC<IInfoNavProvider> = ({
	children,
	t
}) => {

	const toc = t('infoPage', { returnObjects: true }) as Record<
		string,
		string
	>

	return (
		<div className='flex flex-col gap-4 lg:flex-row'>
			{/* ===== Меню для мобильных ===== */}
			<div className='lg:hidden'>
				<DropdownMenu className='mt-2 ml-2'>
					<DropdownMenuTrigger className='rounded-md border px-4 py-2 shadow-sm'>
						{t('menu')}
					</DropdownMenuTrigger>
					<DropdownMenuContent className='min-w-[200px]'>
						<nav className='space-y-2'>
							<DropdownMenuItem>
								<Link
									href='/'
									className='flex items-center gap-2 rounded-md text-gray-700 transition-colors hover:text-gray-900'
								>
									<BackButton t={t} className='relative top-auto left-auto' />
								</Link>
							</DropdownMenuItem>

							{Object.entries(toc).map(([key, text]) => (
								<DropdownMenuItem key={key}>
									<Link
										href={`/${key}`}
										className='block w-full rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
									>
										{text}
									</Link>
								</DropdownMenuItem>
							))}
						</nav>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* ===== Меню для десктопа ===== */}
			<nav className='hidden w-64 space-y-2 border-r pr-4 lg:block'>
				<Link
					href='/'
					className='flex items-center gap-2 rounded-md text-gray-700 transition-colors hover:text-gray-900'
				>
					<BackButton t={t} className='relative top-auto left-auto' />
				</Link>

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

			{/* ===== Контент ===== */}
			<div className='flex-1'>
				<div className='mt-4 lg:mt-0'>{children}</div>
			</div>
		</div>
	)
}
