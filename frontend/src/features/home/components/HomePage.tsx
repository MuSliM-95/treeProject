import { TelegramIcon } from '.'
import { TFunction } from 'i18next'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/shared/components'

import { Advertising } from './Advertising'
import { FaqSection } from './FaqSection'
import { Footer } from './Footer'
import { Header } from './Header'
import { HomeReactXFlow } from './HomeReactXFlow'
import { Reviews } from './Reviews'
import { pageConfig } from '@/shared/config'

interface HeaderProps {
	t: TFunction
	locale: string
}

export default function HomePage({ t, locale }: HeaderProps) {
	return (
		<div className='min-h-screen w-full overflow-x-hidden px-4 py-8 text-[#2e2e2e] md:px-20'>
			<Header t={t} locale={locale} />
			<main>
				<section className='mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 md:flex-row'>
					<div 
						className='flex-1'
					>
						<h2 className='font-serif text-4xl leading-snug font-bold text-[#4a372a] md:text-5xl'>
							{t('homepage.exploreRoots')}
						</h2>
						<p className='mt-4 max-w-xl text-lg text-[#5a4638]'>
							{t('homepage.archiveBuildPreserve')}
						</p>
						<div className='mt-6 flex flex-wrap gap-4'>
							<Link
								href={pageConfig.tree.tree}
								className='flex items-center rounded-md bg-[#6a4e3a] px-6 text-lg text-white hover:bg-[#523a2a]'
							>
								{t('homepage.getStarted')}
								<ArrowRight className='mt-1 ml-2 h-2 w-2' />
							</Link>
							<Link href={pageConfig.info.lear_more}>
								<Button
									variant='outline'
									className='border-[#6a4e3a] text-[#6a4e3a] hover:bg-[#f3ebe3]'
								>
									{t('homepage.infoPage.lear-more')}
								</Button>
							</Link>
						</div>
					</div>

					<div>
						<div className='max-w-sm overflow-hidden'>
							<img
								src='/images/home-tree-img.png'
								alt={t('homepage.familyImageAlt')}
								className='w-full rounded-t-2xl object-cover'
							/>
							<div className='p-4 text-center font-serif text-sm text-[#5e4432] italic'>
								{t('homepage.familyQuote')}
							</div>
						</div>
					</div>
				</section>

				<HomeReactXFlow />
				<Advertising locale={locale} t={t}/>
				<TelegramIcon locale={locale}/>
				<FaqSection t={t}/>
				<Reviews t={t} />
			</main>
			<Footer t={t}/>
		</div>
	)
}
