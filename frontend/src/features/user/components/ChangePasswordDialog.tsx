'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
	ChangePasswordSchema,
	TypeChangePasswordSchema
} from '@/features/user/schemes/change-password-schema'

import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input
} from '@/shared/components'

import { useUpdatePasswordMutation } from '../hooks/useUpdatePasswordMutation'

interface IPChangePasswordDialog {}

export function ChangePasswordDialog({}: IPChangePasswordDialog) {
	const { t } = useTranslation('auth')
	const [isShowCode, setIsShowCode] = useState(false)
	const [open, setOpen] = useState(false)

	const { update, isLoadingUpdate } = useUpdatePasswordMutation()

	const passwordForm = useForm<TypeChangePasswordSchema>({
		resolver: zodResolver(ChangePasswordSchema(t)),
		defaultValues: {
			oldPassword: '',
			password: '',
			passwordRepeat: '',
			code: ''
		}
	})

	const handleChangePassword = async (values: TypeChangePasswordSchema) => {
		const { toast } = await import('sonner')

		try {
			const result = await update(values)
			if (result.messageTwo) {
				setIsShowCode(true)
				toast.message(result?.messageTwo)
				return
			}

			if (result.message) {
				toast.message(result.message)
				passwordForm.reset()
				setIsShowCode(false)
				setOpen(false)
			}
		} catch (error) {
			const err = error as Error
			toast.error(t(err.message))
		}
	}

	const backHandler = () => {
		setIsShowCode(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='secondary'>
					{t('profile.changePassword')}
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[400px]'>
				<DialogHeader>
					<DialogTitle>{t('profile.changePassword')}</DialogTitle>
				</DialogHeader>

				<FormProvider {...passwordForm}>
					<form
						onSubmit={passwordForm.handleSubmit(
							handleChangePassword
						)}
						className='mt-2 space-y-3'
					>
						{!isShowCode && (
							<>
								<FormField
									name='oldPassword'
									control={passwordForm.control}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													type='password'
													placeholder={t(
														'profile.currentPassword'
													)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name='password'
									control={passwordForm.control}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													type='password'
													placeholder={t(
														'profile.newPassword'
													)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name='passwordRepeat'
									control={passwordForm.control}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													type='password'
													placeholder={t(
														'profile.confirmNewPassword'
													)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}

						{isShowCode && (
							<FormField
								name='code'
								control={passwordForm.control}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												type='text'
												placeholder={t(
													'profile.confirmationCode'
												)}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<Button
							type='submit'
							className='w-full'
							disabled={isLoadingUpdate}
						>
							{isLoadingUpdate
								? t('profile.sending')
								: isShowCode
									? t('profile.confirmCode')
									: t('profile.updatePassword')}
						</Button>
						{isShowCode && (
							<Button
								type='button'
								variant={'link'}
								className='w-full'
								onClick={backHandler}
								disabled={isLoadingUpdate}
							>
								{t('back')}
							</Button>
						)}
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}
