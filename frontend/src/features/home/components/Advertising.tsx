import { TFunction } from 'i18next'
import React from 'react'

import { CustomAd } from './CustomAd'

interface Props {
	className?: string
	locale: string
	t: TFunction
}

const adsRU = [
	{
		url: 'https://purpleschool.ru/course/javascript-basics?utm_source=ref&utm_campaign=ref&referralId=15948'
	},
	{
		url: 'https://purpleschool.ru/course/html-css?utm_source=ref&utm_campaign=ref&referralId=15948'
	},
	{
		url: 'https://purpleschool.ru/course/nodejs?utm_source=ref&utm_campaign=ref&referralId=15948'
	},
	{
		url: 'https://purpleschool.ru/course/nestjs?utm_source=ref&utm_campaign=ref&referralId=15948'
	},
	{
		url: 'https://purpleschool.ru/profession/devops?utm_source=ref&utm_campaign=ref&referralId=15948'
	}
]

const adsRU2 = [
	{
		img: 'images/657b85237693073.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
		url: 'https://uuwgc.com/g/bd7a1b8337cd19109cf68b0fa31d56/?erid=F7NfYUJRWmqqH7eTNtLw'
	}
]

const adsRU3 = [
	{
		img: 'images/403bbebea56587321ba75b8fc1d9f99e.png',
		url: 'https://kjuzv.com/g/q6gfnfvsq0cd19109cf6a804937a48/?erid=MvGzQC98w3Z1gMq1kx5ACoy5'
	}
]

// Реклама для EN
const adsEN = [
	{
		img: '/images/banner-300-250.f58d.jpg',
		url: 'https://rzekl.com/g/1e8d114494cd19109cf616525dc3e8/'
	}
]

const adsEN2 = [
	{
		img: '/images/banner-300-250.f58d.jpg',
		url: 'https://rzekl.com/g/1e8d114494cd19109cf616525dc3e8/'
	}
]

const adsEN3 = [
	{
		img: '/images/banner-300-250.f58d.jpg',
		url: 'https://rzekl.com/g/1e8d114494cd19109cf616525dc3e8/'
	}
]

export const Advertising: React.FC<Props> = ({ className, locale, t }) => {
	const isEnglish = locale === 'en'

	const ads = isEnglish ? adsEN : adsRU
	const ads2 = isEnglish ? adsEN2 : adsRU2
	const ads3 = isEnglish ? adsEN3 : adsRU3

	return (
		<section className='mt-24'>
			<div className='text-center'>
				<h3 className='text-2xl font-semibold'>
					{t('homepage.ads.title')}
				</h3>
			</div>
			{!isEnglish ? (
				<div className='mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-3'>
					<CustomAd ads={ads} />
					<CustomAd ads={ads2} />
					<CustomAd ads={ads3} />
				</div>
			) : (
				<div className='mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-3'>
					<CustomAd ads={adsEN} />
					<CustomAd ads={adsEN2} />
					<CustomAd ads={adsEN3} />
				</div>
			)}
		</section>
	)
}
