'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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

import { useDeleteProfileMutation } from '../hooks/useDeleteProfileMutation'
import {
	DeleteProfileSchema,
	TypeDeleteProfileSchema
} from '../schemes/delete-profile-schema'

export function ChangeDeleteProfileDialog() {
	const { t } = useTranslation('auth')
	const [isShowCode, setIsShowCode] = useState(false)
	const [open, setOpen] = useState(false)

	const { update, isLoadingUpdate } = useDeleteProfileMutation(setIsShowCode)

	const passwordForm = useForm<TypeDeleteProfileSchema>({
		resolver: zodResolver(DeleteProfileSchema(t)),
		defaultValues: { code: '' }
	})

	const handleChangePassword = async (values: TypeDeleteProfileSchema) => {
		update(values)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='secondary'>
					{t('profile.deleteProfile')}
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[400px]'>
				<DialogHeader>
					<DialogTitle>{t('profile.deleteProfile')}</DialogTitle>
				</DialogHeader>

				<FormProvider {...passwordForm}>
					<form
						onSubmit={passwordForm.handleSubmit(
							handleChangePassword
						)}
						className='mt-2 space-y-3'
					>
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
									: t('profile.deleteProfile')}
						</Button>
						{isShowCode && (
							<Button
								className='w-full'
								type='submit'
								variant={'link'}
							>
								{t('requestNewCode')}
							</Button>
						)}
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}
