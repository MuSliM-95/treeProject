import { Send } from 'lucide-react'
import Link from 'next/link'
import React  from 'react'


interface Props {
	className?: string
	locale: string
}

export const TelegramIcon: React.FC<Props> = ({ className, locale }) => {
		return (
		<div className='fixed top-1/3 left-2'>
			<Link
				href={
					locale === 'ru'
						? 'https://t.me/AsIntended_ru'
						: 'https://t.me/AsIntended_en'
				}
				target='_blank'
				className='flex items-center gap-2 border-b-2 border-transparent text-[#6a4e3a] hover:border-[#6a4e3a]'
			>
				<Send className='h-8 w-8' />
			</Link>
		</div>
	)
}
