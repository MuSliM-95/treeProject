"use client"
import i18next from 'i18next'
import { Send } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


interface Props {
	className?: string
}

export const TelegramIcon: React.FC<Props> = ({ className }) => {
	const [language, setLanguage] = useState(i18next.language)

	useEffect(() => {
		const handleChange = (lng: string) => setLanguage(lng)
		i18next.on('languageChanged', handleChange)
	  
		return () => {
		  i18next.off('languageChanged', handleChange)
		}
	}, [])
	
	return (
		<div className='fixed top-1/3 left-2'>
			<Link
				href={
					language === 'ru'
						? 'https://t.me/ideasAnd_Actions'
						: 'https://t.me/ideasAnd_Actions_en'
				}
				target='_blank'
				className='flex items-center gap-2 border-b-2 border-transparent text-[#6a4e3a] hover:border-[#6a4e3a]'
			>
				<Send className='h-8 w-8' />
			</Link>
		</div>
	)
}
