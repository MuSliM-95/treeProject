'use client'
import { LucideLoader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Loading() {
	const { t } = useTranslation('auth')
	return (
		<div className='flex items-center justify-center text-sm'>
			<LucideLoader2 className='mr-2 size-5 animate-spin' />
			{t('loading')}
		</div>
	)
}
