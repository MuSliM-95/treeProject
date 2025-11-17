'use client'

import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { I18nextProvider } from 'react-i18next'

import i18n from '@/shared/utils/i18n/i18n-client'
import { SpinnerOverlay } from '@/shared/components'

function LoadingMessage() {
	const { t } = useTranslation('tree')
	return <SpinnerOverlay text={`${t('loading')}...`} />
}

const TreePageClientDynamic = dynamic(
	() => import('@/features/tree/components/ui/TreePageClient'),
	{
		ssr: false, // полностью клиентский рендер
		loading: () => (
			<I18nextProvider i18n={i18n}>
				<LoadingMessage />
			</I18nextProvider>
		)
	}
)

export default function TreePage() {
	return (
		<main className='bg-background text-foreground h-screen w-full'>
			<TreePageClientDynamic />
		</main>
	)
}
