'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaYandex } from 'react-icons/fa'
import { Button } from '@/shared/components'
import { authService } from '../services'
import { useTranslation } from 'react-i18next'

export function AuthSocial() {
	const router = useRouter()
	const { t } = useTranslation('auth')

	const { mutateAsync } = useMutation({
		mutationKey: ['oauth by provider'],
		mutationFn: async (provider: 'google' | 'yandex') =>
			await authService.oauthByProvider(provider)
	})

	const onClick = async (provider: 'google' | 'yandex') => {
		const response = await mutateAsync(provider)

		if (response) {
			router.push(response.url)
		}
	}

	return (
		<>
			<div className='grid grid-cols-2 gap-6'>
				<Button onClick={() => onClick('google')} variant='outline'>
					<FaGoogle className='mr-2 size-4' />
					{t('auth-form.google')}
				</Button>
				<Button onClick={() => onClick('yandex')} variant='outline'>
					<FaYandex className='mr-2 size-4' />
					{t('auth-form.yandex')}
				</Button>
			</div>
			<div className='relative mb-2 mt-3 space-y-4'>
				<div className='absolute inset-2 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						{t('auth-form.or')}
					</span>
				</div>
			</div>
		</>
	)
}
