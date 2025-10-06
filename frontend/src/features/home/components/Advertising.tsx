import React from 'react'

import { CustomAd } from './CustomAd'
import { PromoBanner } from './PromoBanner'
import { TFunction } from 'i18next'

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
	}
]

const adsRU2 = [
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
	}
]

const adsRU3 = [
	{
		title: 'Creatium',
		description:
			'Запустите сайт на конструкторе Creatium без помощи программистов и дизайнеров и начните получать клиентов уже сегодня.',
		url: 'https://creatium.io/?promo=MuHaMMaD',
		image: 'creatium.png'
	},

	{
		title: 'Devops инженер',
		description: 'Автоматизируй. Оптимизируй. Управляй.',
		url: 'https://purpleschool.ru/profession/devops?utm_source=ref&utm_campaign=ref&referralId=15948',
		image: 'devops.png'
	}
]

// Реклама для EN
const adsEN = [
	{
		title: 'Creatium',
		description:
			'Launch your website with Creatium without developers or designers and start getting clients today.',
		url: 'https://creatium.app/?promo=MuHaMMaD_en',
		image: 'instagram-post-106_605aefa2172a4.png'
	}
]

const adsEN2 = [
	{
		title: 'Node.js from Scratch',
		description: 'Basics and application architecture',
		url: 'https://example.com/node-course',
		image: 'node-en.png'
	},
	{
		title: 'NestJS from Scratch',
		description: 'Modern backend with TypeScript & Node.js',
		url: 'https://example.com/nest-course',
		image: 'nest-en.png'
	}
]

const adsEN3 = [
	{
		title: 'Docker + Ansible from Scratch',
		description: 'Deploy and manage Swarm clusters',
		url: 'https://example.com/docker-course',
		image: 'docker-en.png'
	},
	{
		title: 'DevOps Engineer',
		description: 'Automate. Optimize. Manage.',
		url: 'https://example.com/devops-course',
		image: 'devops-en.png'
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

			<PromoBanner t={t}/>
			{/* <div
				className={cn(isEnglish && 'hidden', 'mx-auto mt-10 max-w-7xl')}
			>
				<script
					src='//wpwidget.ru/js/wps-widget-entry.min.js'
					async
				></script>
				<div
					className='wps-widget'
					data-w='//wpwidget.ru/greetings?orientation=3&pid=29659'
				></div>
			</div> */}

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
