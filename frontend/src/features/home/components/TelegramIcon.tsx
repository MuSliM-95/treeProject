import { Send } from 'lucide-react'
import { TFunction } from 'next-i18next'
import Link from 'next/link'
import React  from 'react'


interface Props {
	className?: string
	locale: string,
	t: TFunction
}

export const TelegramIcon: React.FC<Props> = ({ className, locale, t }) => {
		return (
		<div className='fixed top-1/3 left-2'>
			<Link
				href={
					locale === 'ru'
						? 'https://t.me/AsIntended_ru'
						: 'https://t.me/AsIntended_en'
				}
				aria-label={t('open-telegram')}
				target='_blank'
				className='flex items-center gap-2 border-b-2 border-transparent text-[#6a4e3a] hover:border-[#6a4e3a]'
			>
				<Send className='h-8 w-8' />
			</Link>
		</div>
	)
}
