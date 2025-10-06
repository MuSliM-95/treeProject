'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components'

import i18n from '@/shared/utils/i18n/i18n-client'




export default function LanguageChanger() {
	
	const currentLocale = i18n.language
	const router = useRouter()
	const currentPathname = usePathname()

	const handleChange = (lang: 'ru' | 'en') => {
		const days = 30
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		const expires = date.toUTCString()
		document.cookie = `NEXT_LOCALE=${lang};expires=${expires};path=/`
		// Получаем текущий путь без префикса языка
		let newPath = currentPathname

		// Удаляем текущий префикс языка, если он есть
		if (currentLocale) {
			newPath = newPath.replace(new RegExp(`^/${currentLocale}`), '')
		}

		// Формируем новый путь
		router.push(`/${lang}${newPath}`)
		i18n.changeLanguage(lang)
	}


	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='text-[#6a4e3a]'>
					🌐 {i18n.language?.toUpperCase()}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-28'>
				<DropdownMenuItem onClick={() => handleChange('ru')}>
					🇷🇺 Русский
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleChange('en')}>
					🇺🇸 English
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
