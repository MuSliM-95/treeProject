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
import i18nClient from '@/shared/utils/i18n/i18n-client'

interface ILanguageChanger {
	locale: string
}

export default function LanguageChanger({ locale }: ILanguageChanger) {
	const router = useRouter()
	const currentPathname = usePathname()

	const handleChange = (lang: 'ru' | 'en') => {
	
		const cleanedPath = currentPathname.replace(/^\/(en|ru)(?=\/|$)/, '')

		i18nClient.changeLanguage(lang)

		router.push(`/${lang}${cleanedPath}`)
		router.refresh()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant={'ghost'}
					className='text-[#6a4e3a] focus-visible:ring-0'
				>
					🌐 {locale.toUpperCase()}
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
