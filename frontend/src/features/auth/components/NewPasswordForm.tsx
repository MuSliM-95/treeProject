'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
	Input
} from '@/shared/components'

import { useNewPasswordMutation } from '../hooks'
import { NewPasswordSchema, TypeNewPasswordSchema } from '../schemes'

import { AuthWrapper } from './AuthWrapper'

export function NewPasswordForm() {
	const { t } = useTranslation('auth')
	const schema = NewPasswordSchema(t) 

	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			password: ''
		}
	})

	const { newPassword, isLoadingNew } = useNewPasswordMutation()

	const onSubmit = (values: TypeNewPasswordSchema) => {
		newPassword({ values })
	}

	return (
		<AuthWrapper
			heading={t('auth-form.newPassword.title')}
			description={t('auth-form.newPassword.description')}
			backButtonLabel={t('auth-form.newPassword.back')}
			backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{t('auth-form.newPassword.passwordLabel')}
								</FormLabel>
								<FormControl>
									<Input
										placeholder='******'
										disabled={isLoadingNew}
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoadingNew}>
						{t('auth-form.newPassword.continue')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
