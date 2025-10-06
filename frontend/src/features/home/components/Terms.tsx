import { TFunction } from 'i18next'

import { InfoNavProvider } from '@/shared/providers'

interface ITerms {
	t: TFunction
}

export function Terms({ t }: ITerms) {
	return (
		<InfoNavProvider t={t}>
			<div className='mx-auto max-w-4xl p-6 sm:p-8 lg:p-12'>
				<div className='space-y-4'>
					{Array.from({ length: 11 }).map((_, idx) => {
						const key = String(idx + 1)
						return (
							<details
								key={key}
								className='rounded-lg bg-white/60 p-4 shadow-sm dark:bg-slate-800/60'
							>
								<summary className='cursor-pointer list-none text-base font-medium sm:text-lg'>
									{t(`sections.${key}.title`)}
								</summary>
								<div className='mt-3 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300'>
									{t(`sections.${key}.body`)}
								</div>
							</details>
						)
					})}
				</div>

				<footer className='mt-8 text-sm text-slate-600 dark:text-slate-400'>
					<p>{t('lastUpdated')}</p>
				</footer>
			</div>
		</InfoNavProvider>
	)
}
