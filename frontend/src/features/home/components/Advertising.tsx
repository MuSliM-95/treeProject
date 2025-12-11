import { TFunction } from 'i18next'
import React from 'react'

import { CustomAd } from './CustomAd'
import { PromoBanner } from './PromoBanner'

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
		url: 'https://purpleschool.ru/profession/devops?utm_source=ref&utm_campaign=ref&referralId=15948'
	}
]

const adsRU3 = [
	{
		url: 'https://purpleschool.ru/profession/devops?utm_source=ref&utm_campaign=ref&referralId=15948'
	}
]

// Реклама для EN
const adsEN = [
	{
		url: 'https://purpleschool.ru/course/html-css?utm_source=ref&utm_campaign=ref&referralId=15948'
	}
]

const adsEN2 = [
	{ 
		url: '' 
	}
]

const adsEN3 = [
	{
		url: ''
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
			{!isEnglish && (
				<div className='mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-3'>
					<CustomAd ads={ads} />
					<CustomAd ads={ads2} />
					<CustomAd ads={ads3} />
				</div>
			)}
		</section>
	)
}
