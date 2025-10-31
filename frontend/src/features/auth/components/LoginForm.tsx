'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
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

import { useLoginMutation } from '../hooks'
import { LoginSchema, TypeLoginSchema } from '../schemes'

import { AuthWrapper } from './AuthWrapper'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

interface IPLoginForm {
	t: TFunction
}

export function LoginForm() {
	const [isShowTwoFactor, setIsShowFactor] = useState(false)
	const { t } = useTranslation('auth')
	const schema = LoginSchema(t)

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { login, isLoadingLogin } = useLoginMutation(setIsShowFactor, t)

	const onSubmit = (values: TypeLoginSchema) => {
		login({ values })
	}

	return (
		<AuthWrapper
			heading={t('auth-form.login.title')}
			description={t('auth-form.login.description')}
			backButtonLabel={t('auth-form.login.registerLink')}
			backButtonHref='/auth/register'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					{isShowTwoFactor && (
						<FormField
							control={form.control}
							name='code'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t('auth-form.login.codeLabel')}
									</FormLabel>
									<FormControl>
										<Input
											placeholder='123456'
											disabled={isLoadingLogin}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{!isShowTwoFactor && (
						<>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-black'>
											{t('auth-form.login.email')}
										</FormLabel>
										<FormControl>
											<Input
												placeholder='ivan@example.com'
												disabled={isLoadingLogin}
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
										<div className='flex items-center justify-between'>
											<FormLabel className='text-black'>
												{t('auth-form.login.password')}
											</FormLabel>
											<Link
												href='/auth/reset-password'
												className='ml-auto inline-block text-sm underline'
											>
												{t('auth-form.login.forgot')}
											</Link>
										</div>
										<FormControl>
											<Input
												placeholder='******'
												disabled={isLoadingLogin}
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
					<Button type='submit' disabled={isLoadingLogin}>
						{t('auth-form.login.submit')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
