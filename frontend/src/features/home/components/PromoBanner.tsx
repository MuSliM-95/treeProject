import { TFunction } from 'i18next'
import Link from 'next/link'
import React from 'react'

interface IPromoBanner {
	t: TFunction
}

export const PromoBanner: React.FC<IPromoBanner> = ({ t }) => {
	return (
		<section className='relative mx-auto mt-10 w-full max-w-7xl overflow-hidden rounded-xl bg-gradient-to-r from-[#6a82fa] to-[#8abffb] p-4 text-white shadow-lg'>
			<iframe
				src='https://www.highperformanceformat.com/79db065236639e644fcb02bd3558a8f0/iframe.html'
				width='728'
				height='90'
				style={{ border: 'none', overflow: 'hidden' }}
			></iframe>
		</section>
	)
}
