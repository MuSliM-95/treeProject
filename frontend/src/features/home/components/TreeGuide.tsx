import { InfoNavProvider } from '@/shared/providers'
import { TFunction } from 'i18next'
import React from 'react'

interface Props {
	className?: string
	t: TFunction
}

export const TreeGuide: React.FC<Props> = ({ className, t }) => {
	
	const sections = t('homepage.guide.sections', { returnObjects: true }) as {
		header: string
		content: string
	}[]

	return (
		<InfoNavProvider t={t}>
			<div className='mx-auto max-w-3xl p-4'>
				<h1 className='mb-6 text-2xl font-bold'>
					{t('homepage.guide.title')}
				</h1>
				<div className='space-y-6'>
					{sections?.map((section, index) => (
						<div
							key={index}
							className='rounded-lg border bg-[#fdfaf6] p-4'
						>
							<h2 className='mb-2 text-xl font-semibold'>
								{section.header}
							</h2>
							<p className='text-gray-700'>{section.content}</p>
						</div>
					))}
				</div>
			</div>
		</InfoNavProvider>
	)
}
