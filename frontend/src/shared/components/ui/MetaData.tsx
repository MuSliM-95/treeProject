import Script from 'next/script'
import React from 'react'
import { TFunction } from 'i18next'

interface Props {
	t: TFunction
	locale: string
}

export const MetaData: React.FC<Props> = ({ t, locale }) => {

	const faqItemsRaw  = t('homepage.faq.items', { returnObjects: true }) as {
		question: string
		answer: string
	}[]
	
	const faqItems = Array.isArray(faqItemsRaw) ? faqItemsRaw : []


	const mainEntity = faqItems.map(({ question, answer }) => ({
		'@type': 'Question',
		name: question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: answer
		}
	}))



	return (
		<>
			<Script
				strategy='beforeInteractive'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						name: 'Genealogy',
						url: 'https://genealogyhub.ru/ru',

						description: t('homepage.meta.description'),
						inLanguage: locale,
						keywords: [
							'генеалогия',
							'родословная',
							'family tree',
							'ancestry',
							'предки'
						]
					})
				}}
			/>
			<Script
				id='faq-schema'
				strategy='beforeInteractive'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: mainEntity
					})
				}}
			/>
		</>
	)
}
