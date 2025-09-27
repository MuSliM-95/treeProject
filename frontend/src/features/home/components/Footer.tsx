'use client'

import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'

interface Props {
	className?: string
}

export const Footer: React.FC<Props> = ({ className }) => {
	const { t } = useTranslation()

	return (
		<footer
			className={`mt-24 border-t border-[#e4d5c8] py-10 text-center text-sm text-[#7a6453] ${className ?? ''}`}
		>
			<p>
				&copy; {new Date().getFullYear()} {t('homepage.footer.genealogy')} —{' '}
				{t('homepage.footer.rights')}
			</p>
			<p className='mt-2'>
				<Link href='/privacy' className='hover:underline'>
					{t('homepage.infoPage.privacy')}
				</Link>{' '}
				&middot;{' '}
				<Link href='/terms' className='hover:underline'>
					{t('homepage.infoPage.terms')}
				</Link>
			</p>
		</footer>
	)
}
