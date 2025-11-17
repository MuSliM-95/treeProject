'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Card,
	SpinnerOverlay
} from '@/shared/components'
import CopyLinkButton from '@/shared/components/ui/CopyLinkButton'
import { InfoNavProvider } from '@/shared/providers'
import dynamic from 'next/dynamic'

export const TermsDynamic = dynamic(() => import('@features/home/components/Terms').then(m => m.Terms), {
       ssr: false,
	   loading:  () => <SpinnerOverlay className='size-10' /> ,
})

export function Terms() {
	const [openItem, setOpenItem] = useState<string | undefined>(undefined)
	const itemsRef = useRef<Record<string, HTMLDivElement>>({})
	const { t } = useTranslation('terms')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const hash = window.location.hash.replace('#', '')
			if (hash) {
				setOpenItem(hash)

				// Ждём следующего рендера, чтобы элемент уже существовал в DOM
				setTimeout(() => {
					const el = itemsRef.current[hash]
					if (el) {
						el.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						})
					}
				}, 50)
			}
		}
	}, [])

	return (
		<InfoNavProvider t={t}>
			<div className='mx-auto max-w-4xl p-4 sm:p-6 lg:p-10'>
				<Card className='p-6 shadow-lg'>
					<h1 className='mb-6 text-center text-2xl font-bold'>
						{t('title')}
					</h1>

					<Accordion
						type='single'
						collapsible
						value={openItem}
						onValueChange={val => setOpenItem(val || undefined)}
						className='w-full space-y-2'
					>
						{Array.from({ length: 11 }).map((_, idx) => {
							const key = String(idx + 1)
							const id = `rule-${key}`
							return (
								<AccordionItem
									key={id}
									value={id}
									id={id}
									className='scroll-mt-24 overflow-hidden rounded-lg border'
									ref={(el: HTMLDivElement) => {
										if (el) itemsRef.current[id] = el
									}}
								>
									<AccordionTrigger className='relative hover:bg-muted flex items-center justify-between px-4 py-3 text-base font-medium sm:text-lg'>
										<span>
											{t(`sections.${key}.title`)}
										</span>
										<CopyLinkButton id={id} />
									</AccordionTrigger>

									<AccordionContent className='px-4 pb-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300'>
										{t(`sections.${key}.body`)}
									</AccordionContent>
								</AccordionItem>
							)
						})}
					</Accordion>

					<footer className='mt-8 text-center text-sm text-slate-500 dark:text-slate-400'>
						<p>{t('lastUpdated')}</p>
					</footer>
				</Card>
			</div>
		</InfoNavProvider>
	)
}
