'use client'

import { useTranslation } from 'next-i18next'

import { InfoNavProvider } from '@/shared/providers'
import Link from 'next/link'

export function Privacy() {
	const { t } = useTranslation('privacy')

	return (
		<InfoNavProvider>
			<div className='mx-auto max-w-3xl p-4'>
				<h1 className='mb-6 text-3xl font-bold'>
					{t('privacy.title')}
				</h1>

				{/* Оглавление */}
				<nav className='mb-8 space-y-2'>
					{Object.entries(
						t('privacy.toc', { returnObjects: true }) as Record<
							string,
							string
						>
					).map(([key, label]) => (
						<Link
							key={key}
							href={`#${key}`}
							className='block text-blue-600 hover:underline'
						>
							{label}
						</Link>
					))}
				</nav>

				{/* Разделы */}
				{Object.entries(
					t('privacy.sections', { returnObjects: true }) as Record<
						string,
						string
					>
				).map(([key, content], idx) => (
					<section key={key} id={key} className='mb-6'>
						<h2 className='mb-2 text-xl font-semibold'>
							{t(`privacy.toc.${key}`)}
						</h2>
						<p>{content}</p>
					</section>
				))}
			</div>
		</InfoNavProvider>
	)
}
