'use client'

import { useTranslation } from 'next-i18next'
import React, { useCallback, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/features/tree/hooks/useHooks'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components'

import { langToggle } from '../hooks/homeSlice'
import { toast } from 'sonner'

interface Props {
	className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
	const { t, i18n } = useTranslation()
	const dispatch = useAppDispatch()
	const lang = useAppSelector(state => state.home.lang)
	const toggleLanguage = useCallback((params: 'ru' | 'en') => {
		dispatch(langToggle({ lang: params }))
		i18n.changeLanguage(params)
	},[dispatch, i18n])

	useEffect(() => {
		if (lang) {
			i18n.changeLanguage(lang)
			return
		}

		// Если выбора нет, определяем по языку браузера
		const browserLang = navigator.language || navigator.languages[0]
        toast.message(browserLang)
		if (browserLang.toLowerCase().includes('ru')) {
			i18n.changeLanguage('ru')
		} else {
			i18n.changeLanguage('en')
		}
	}, [lang, dispatch,  i18n])

	return (
		<header className='mx-auto mb-12 flex max-w-7xl items-center justify-between'>
			<h1 className='font-serif text-2xl tracking-wide text-[#6a4e3a]'>
				{t('homepage.header.siteTitle')}
			</h1>
			<div className='flex items-center gap-6'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='text-[#6a4e3a]'>
							🌐 {i18n.language?.toUpperCase()}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-28'>
						<DropdownMenuItem onClick={() => toggleLanguage('ru')}>
							🇷🇺 Русский
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => toggleLanguage('en')}>
							🇺🇸 English
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				{/* <Link
					href='/dashboard/settings'
					aria-label={t('homepage.header.goToProfile')}
					className='flex items-center gap-2 border-b-2 border-transparent text-[#6a4e3a] hover:border-[#6a4e3a]'
				>
					<User className='h-5 w-5' /> {t('homepage.header.profile')}
				</Link> */}
			</div>
		</header>
	)
}
