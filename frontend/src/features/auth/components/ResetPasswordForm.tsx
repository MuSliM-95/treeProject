'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	SpinnerOverlay
} from '@/shared/components'
import { pageConfig } from '@/shared/config'

import { useResetPasswordMutation } from '../hooks'
import {
	ResetPasswordSchema,
	TypeResetPasswordSchema
} from '../schemes/reset-password.schema'

import { AuthWrapper } from './AuthWrapper'

export const ResetPasswordFormDynamic = dynamic(
	() =>
		import('@features/auth/components/ResetPasswordForm').then(
			m => m.ResetPasswordForm
		),
	{
		ssr: false,
		loading: () => <SpinnerOverlay className='size-10' />
	}
)

export function ResetPasswordForm() {
	const { t } = useTranslation('auth')
	const schema = ResetPasswordSchema(t)
	const form = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: ''
		}
	})

	const { reset, isLoadingReset } = useResetPasswordMutation()

	const onSubmit = (values: TypeResetPasswordSchema) => {
		reset({ values })
	}

	return (
		<AuthWrapper
			heading={t('auth-form.reset.title')}
			description={t('auth-form.reset.description')}
			backButtonLabel={t('auth-form.reset.back')}
			backButtonHref={pageConfig.auth.login}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{t('auth-form.reset.email')}
								</FormLabel>
								<FormControl>
									<Input
										placeholder='ivan@example.com'
										disabled={isLoadingReset}
										type='email'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoadingReset}>
						{t('auth-form.reset.submit')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
