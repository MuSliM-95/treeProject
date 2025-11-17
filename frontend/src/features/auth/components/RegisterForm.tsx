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
	SpinnerOverlay
} from '@/shared/components'
import { Input } from '@/shared/components/ui/input'
import { pageConfig } from '@/shared/config'

import { useRegisterMutation } from '../hooks'
import { RegisterSchema, TypeRegisterSchema } from '../schemes'

import { AuthWrapper } from './AuthWrapper'

export const RegisterFormDynamic = dynamic(
	() =>
		import('@/features/auth/components/RegisterForm').then(
			m => m.RegisterForm
		),
	{
		ssr: false,
		loading: () => <SpinnerOverlay className='size-10' />
	}
)

export function RegisterForm() {
	const { t } = useTranslation('auth')
	const schema = RegisterSchema(t)
	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const { register, isLoadingRegister } = useRegisterMutation()

	const onSubmit = (values: TypeRegisterSchema) => {
		register({ values })
	}

	return (
		<AuthWrapper
			heading={t('auth-form.register.title')}
			description={t('auth-form.register.description')}
			backButtonLabel={t('auth-form.register.loginLink')}
			backButtonHref={pageConfig.auth.login}
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{t('auth-form.register.name')}
								</FormLabel>
								<FormControl>
									<Input
										placeholder={t(
											'auth-form.register.namePlaceholder'
										)}
										disabled={isLoadingRegister}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{t('auth-form.register.email')}
								</FormLabel>
								<FormControl>
									<Input
										placeholder='ivan@example.com'
										disabled={isLoadingRegister}
										type='email'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{t('auth-form.register.password')}
								</FormLabel>
								<FormControl>
									<Input
										placeholder='******'
										disabled={isLoadingRegister}
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{t('auth-form.register.passwordRepeat')}
								</FormLabel>
								<FormControl>
									<Input
										placeholder='******'
										disabled={isLoadingRegister}
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoadingRegister}>
						{t('auth-form.register.submit')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
