'use client'

import React, { useEffect, useState } from 'react'

interface AdItem {
	url: string
}

interface CustomAdProps {
	ads: AdItem[] // массив твоих реклам
	interval?: number // смена рекламы в мс
}

export const CustomAd: React.FC<CustomAdProps> = ({
	ads = [],
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
			<div className='xl1080:text-left flex h-full flex-1 flex-col text-center'>
				<iframe
					src={ad.url}
					height='250'
					width='300'
					scrolling='no'
					className='border: 0; overflow: hidden;'
				/>
			</div>
		</div>
	)
}
