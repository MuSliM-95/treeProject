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
		title: 'JavaScript с нуля',
		description: 'Основы языка и практика для начинающих',
		url: 'https://purpleschool.ru/course/javascript-basics?utm_source=ref&utm_campaign=ref&referralId=15948',
		image: 'b74853df-60b5-478e-af56-8ae08bafd6ac.png'
	},
	{
		title: 'HTML И CSS',
		description: 'Полный курс по верстке с нуля',
		url: 'https://purpleschool.ru/course/html-css?utm_source=ref&utm_campaign=ref&referralId=15948',
		image: 'advertising.png'
	},
	{
		title: 'Node.js - с нуля.',
		description: 'Основы и построение архитектуры приложений.',
		url: 'https://purpleschool.ru/course/nodejs?utm_source=ref&utm_campaign=ref&referralId=15948',
		image: 'node-image1.png'
	},
	{
		title: 'NestJS - с нуля.',
		description: 'Современный backend на TypeScript и Node JS',
		url: 'https://purpleschool.ru/course/nestjs?utm_source=ref&utm_campaign=ref&referralId=15948',
		image: 'nest.png'
	},
	{
		title: 'Devops инженер',
		description: 'Автоматизируй. Оптимизируй. Управляй.',
		url: 'https://purpleschool.ru/profession/devops?utm_source=ref&utm_campaign=ref&referralId=15948',
		image: 'devops.png'
	}
]

const adsRU2 = [
	{
		title: 'Яндекс Еда',
		description: 'Яндекс Еда и  Деливери ',
		image: 'yandex_food.png',
		url: 'https://yyczo.com/g/m6ste24j7qcd19109cf6a368968085/?erid=5jtCeReNwxHpfQTERQfZc5X'
	},
	{
		title: 'Читай город',
		description: 'Эксклюзивно в «Читай-Городе» ',
		image: '403bbebea56587321ba75b8fc1d9f99e.png',
		url: 'https://www.chitai-gorod.ru/r/wfcfV?erid=2W5zFHVdUkQ'
	}
]

const adsRU3 = [
	{
		title: 'Авиасейлс',
		description: 'Тут покупают дешёвые авиабилеты',
		image: '657b85237693073.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
		url: 'https://uuwgc.com/g/bd7a1b8337cd19109cf68b0fa31d56/?erid=F7NfYUJRWmqqH7eTNtLw'
	},
	{
		title: 'AliExpress',
		description: 'AliExpress — миллионы товаров по самым низким ценам.',
		image: 'aliexpress.jpg',
		url: 'https://dhwnh.com/g/vv3q4oey1vcd19109cf6b6d1781017/?erid=2bL9aMPo2e49hMef4pdzo6JkYp'
	}
]

// Реклама для EN
const adsEN = [
	{
		title: 'AliExpress',
		description: 'AliExpress — millions of products at the lowest prices',
		image: 'aliexpress.jpg',
		url: 'https://rzekl.com/g/1e8d114494cd19109cf616525dc3e8/'
	}
]

const adsEN2 = [
	{
		title: 'Geekbuying',
		description: 'GeekBuying.com — the most exciting gadgets at incredibly low prices',
		image: 'images.png',
		url: 'https://bywiola.com/g/78tuvzaw8kcd19109cf60267b86f6e/'
	}
]

const adsEN3 = [
	{
		title: 'Simbye eSIM',
		description: 'We offer instant eSIM activation, FREE 100MB trial, and competitive pricing from $0.50/GB.',
		image: 'images (1).png',
		url: 'https://xmknb.com/g/gp9rkzj3gccd19109cf6daec78ae77/'
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
				<h2 className='text-2xl font-semibold'>
					{t('homepage.ads.title')}
				</h2>
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
