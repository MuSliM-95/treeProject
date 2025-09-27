'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/shared/components'

import { useResetPasswordMutation } from '../hooks'
import {
	ResetPasswordSchema,
	TypeResetPasswordSchema
} from '../schemes/reset-password.schema'

import { AuthWrapper } from './AuthWrapper'
import { useTranslation } from 'react-i18next'

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
			backButtonHref='/auth/login'
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
								<FormLabel>{t('auth-form.reset.email')}</FormLabel>
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
