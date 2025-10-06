'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components'

import i18nConfig from '../../../../i18nConfig'

export default function LanguageChanger() {
	const { i18n } = useTranslation()
	const currentLocale = i18n.language
	const router = useRouter()
	const currentPathname = usePathname()

	const handleChange = (lang: 'ru' | 'en') => {
		const days = 30
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		const expires = date.toUTCString()
		document.cookie = `NEXT_LOCALE=${lang};expires=${expires};path=/`

		if (
			currentLocale === i18nConfig.defaultLocale &&
			!i18nConfig.defaultLocale
		) {
			router.push('/' + lang + currentPathname)
		} else {
			router.push(
				currentPathname.replace(`/${currentLocale}`, `/${lang}`)
			)
		}

		router.refresh()
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
