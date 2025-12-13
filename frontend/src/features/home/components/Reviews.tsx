import { TFunction } from 'i18next'
import React from 'react'

import { Card, CardContent } from '@/shared/components'

interface Props {
	className?: string
	t: TFunction
}

export const Reviews: React.FC<Props> = ({ className, t }) => {
	const reviews = t('homepage.reviews.list', { returnObjects: true }) as {
		text: string
		author: string
	}[]

	return (
		<section className='mt-24 mb-24'>
			<div className='text-center'>
				<h2 className='text-2xl font-semibold text-[#4a372a]'>
					{t('homepage.reviews.title')}
				</h2>
			</div>
			<div className='mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-3'>
				{reviews.map((review, index) => (
					<Card
						key={index}
						className='rounded-lg border border-[#e5d6c5] bg-[#fdfaf6] shadow-sm'
					>
						<CardContent className='p-6'>
							<p className='mb-4 text-[#4d3a2b] italic'>
								{review.text}
							</p>
							<p className='text-right font-semibold text-[#6b5445]'>
								{/* {review.author} */}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}
