import { TFunction } from 'next-i18next'

export const CreateOpenGraph = (t: TFunction, url: string, locale: string) => {
	return {
		title: t('meta.title'),
		description: t('meta.description'),
		url: url,
		siteName: t('meta.name'),
		locale: locale === 'en' ? 'en_US' : 'ru_RU',
		images: [
			{
				url: 'https://genealogyhub.ru/images/og-image.png',
				width: 1200,
				height: 630,
				alt: t('meta.description')
			}
		],
		type: 'website'
	}
}
