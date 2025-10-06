import { TFunction } from 'i18next'
import React from 'react'

import LanguageChanger from './LanguageChanger'

interface Props {
	className?: string
	t: TFunction
	locale: string
}

export const Header: React.FC<Props> = ({ className, t, locale }) => {
	return (
		<header className='mx-auto mb-12 flex max-w-7xl items-center justify-between'>
			<h1 className='font-serif text-2xl tracking-wide text-[#6a4e3a]'>
				{t('homepage.header.siteTitle')}
			</h1>
			<div className='flex items-center gap-6'>
				<LanguageChanger locale={locale} />
				{/* <Link
					href='/dashboard/settings'
					aria-label={t('homepage.header.goToProfile')}
					className='flex items-center gap-2 border-b-2 border-transparent text-[#6a4e3a] hover:border-[#6a4e3a]'
				>
					<User className='h-5 w-5' /> {t('homepage.header.profile')}
				</Link> */}
			</div>
		</header>
	)
}
