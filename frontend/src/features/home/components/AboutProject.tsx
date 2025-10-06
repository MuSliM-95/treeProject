import { TFunction } from 'i18next'

import { InfoNavProvider } from '@/shared/providers'

interface IAboutProject {
	t: TFunction
}

export default function AboutProject({ t }: IAboutProject) {
	return (
		<InfoNavProvider t={t}>
			<section className='mx-auto max-w-3xl px-4 py-8'>
				<h1 className='mb-6 text-center text-3xl font-bold'>
					{t('title')}
				</h1>
				<div className='space-y-4 text-base leading-relaxed text-gray-800 dark:text-gray-200'>
					<p>{t('intro')}</p>
					<p>{t('features')}</p>
					<p>{t('storage')}</p>
					<p>{t('nodes')}</p>
					<p>{t('try')}</p>
					<p>
						{t('contact.text')}{' '}
						<a
							href='https://t.me/MuhammadNode'
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-600 hover:underline'
						>
							@MuhammadNode
						</a>{' '}
						{t('contact.or')}{' '}
						<a
							href='mailto:samahkinets@gmail.com'
							className='text-blue-600 hover:underline'
						>
							samahkinets@gmail.com
						</a>
					</p>
				</div>
			</section>
		</InfoNavProvider>
	)
}
