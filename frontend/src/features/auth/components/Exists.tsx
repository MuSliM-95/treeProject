'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Card, CardContent, SpinnerOverlay } from '@/shared/components'

import { useExistsMutation } from '../hooks/useExistsMutation'
import { pageConfig } from '@/shared/config'
import dynamic from 'next/dynamic'

export const ExistsDynamic = dynamic(() => import('@features/auth/components/Exists').then(m => m.Exists), {
	ssr: false,
	loading: () => <SpinnerOverlay className='size-10' />
})

export function Exists() {
	const { t, i18n } = useTranslation('auth')
	const { mutate, data, isPending, error } = useExistsMutation(t)
	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const token = searchParams.get('token')

		if (!token || error) {
			return router.push(pageConfig.auth.login)
		}
		mutate(token)
	}, [searchParams, error])

	if (isPending) return <p>{t('loading')}...</p>

	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-[#f7f2e9]'>
			<Card className='w-[350px] rounded-2xl p-4 text-center shadow-lg'>
				<div className='flex items-center gap-2'>
					<Link
						href={pageConfig.auth.login}
						className='text-xl font-bold text-red-500'
					>
						{' '}
						<Button
							variant='ghost'
							size='icon'
							className='rounded-full'
						>
							<ArrowLeft className='h-5 w-5' />
						</Button>
					</Link>
				</div>

				<p
					dangerouslySetInnerHTML={{ __html: t('alreadyHasAccount') }}
					className='mb-4 text-lg font-medium'
				></p>

				<CardContent className='mb-4 rounded-lg border px-4 py-3'>
					<p className='font-medium text-gray-700'>{data?.email}</p>
				</CardContent>
			</Card>
		</div>
	)
}
