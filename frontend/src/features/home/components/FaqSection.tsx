'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/shared/components'
import { useTranslation } from 'next-i18next'

export function FaqSection() {
	const { t } = useTranslation()

	const faqItems = t('homepage.faq.items', { returnObjects: true }) as {
		question: string
		answer: string
	}[]
  
	return (
		<section className='mx-auto mt-24 max-w-4xl'>
			<h3 className='mb-6 text-center text-2xl font-semibold text-[#4a372a]'>
				{t('homepage.faq.title')}
			</h3>
			<Accordion type='single' collapsible className='w-full space-y-4'>
				{faqItems.map((item, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger className='text-left text-[#4d3a2b] hover:underline'>
							{item.question}
						</AccordionTrigger>
						<AccordionContent className='text-[#6b5445]'>
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	)
}
