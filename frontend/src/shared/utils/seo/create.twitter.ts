import { TFunction } from "next-i18next"


export const createTwitterMeta = (t: TFunction) => {
	return {
		card: 'summary_large_image',
		title: t('meta.title'),
		description: t('meta.description'),
		images: [
			{
				url: 'https://genealogyhub.ru/images/og-image.png?v=2',
				type: 'image/png'
			}
		]
	}
}