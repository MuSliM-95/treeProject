'use client'
import React, { useEffect, useState } from 'react'

interface AdItem {
	title: string
	description?: string
	image?: string
	url: string
}

interface CustomAdProps {
	ads: AdItem[] // массив твоих реклам
	interval?: number // смена рекламы в мс
}

export const CustomAd: React.FC<CustomAdProps> = ({
	ads,
	interval = 10000
}) => {
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		if (ads.length <= 1) return
		const timer = setInterval(() => {
			setCurrent(prev => (prev + 1) % ads.length)
		}, interval)
		return () => clearInterval(timer)
	}, [ads, interval])

	if (ads.length === 0) return null

	const ad = ads[current]

	return (
		<div
			className='xl1080:flex-row xl1080:items-start flex flex-col items-center justify-between gap-4 rounded border bg-[#fdfaf6] p-4'
			style={{ minHeight: '100px' }}
		>
			{ad.image && (
				<div className='xl1080:w-32 xl1080:justify-start flex w-full flex-shrink-0 justify-center'>
					<img
						src={`/images/${ad.image}`}
						alt={ad.title}
						className='max-h-28 w-auto object-contain'
					/>
				</div>
			)}

			<div className='xl1080:text-left flex h-full flex-1 flex-col text-center'>
				<a
					href={ad.url}
					target='_blank'
					rel='noopener noreferrer'
					className='mb-2 font-bold text-blue-600 hover:underline'
				>
					{ad.title}
				</a>
				{ad.description && (
					<p className='text-sm text-gray-700'>{ad.description}</p>
				)}
			</div>
		</div>
	)
}
