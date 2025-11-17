'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useEmailUpdateMutation } from '@/features/user/hooks/useEmailUpdateMutation'
import {
	ChangeEmailSchema,
	TypeChangeEmailSchema
} from '@/features/user/schemes/change-email-schema'

import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input
} from '@/shared/components'

interface IProps {
	email: string
}

export const EmailUpdate: React.FC<IProps> = ({ email }) => {
	const { t } = useTranslation('auth')
	const [isShowTwoFactor, setIsShowFactor] = useState(false)
	const [open, setOpen] = useState(false)

	const emailForm = useForm<TypeChangeEmailSchema>({
		resolver: zodResolver(ChangeEmailSchema(t)),
		defaultValues: { email: '', code: '' } 
	})
	
	const { updateEmail, isPending } = useEmailUpdateMutation(setIsShowFactor, setOpen, emailForm.reset)

	const handleChangeEmail = async (values: TypeChangeEmailSchema) => {
		await updateEmail(values)
	}

	const backHandler = () => {
		setIsShowFactor(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Input className='mb-4' disabled value={email} />
			<DialogTrigger asChild>
				<Button variant='secondary' className='cursor-pointer'>
					{t('profile.changeEmail')}
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[400px]'>
				<DialogHeader>
					<DialogTitle>{t('profile.changeEmail')}</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={emailForm.handleSubmit(handleChangeEmail)}
					className='mt-2 space-y-3'
				>
					{!isShowTwoFactor && (
						<Controller
							name='email'
							control={emailForm.control}
							render={({ field }) => (
								<div>
									<Input
										type='email'
										placeholder={t(
											'profile.newEmailPlaceholder'
										)}
										{...field}
										disabled={isPending || isShowTwoFactor} // блокируем, если код требуется
									/>
								</div>
							)}
						/>
					)}

					{isShowTwoFactor && (
						<Controller
							name='code'
							control={emailForm.control}
							render={({ field }) => (
								<div>
									<Input
										type='text'
										placeholder={t(
											'profile.confirmationCode'
										)}
										{...field}
										disabled={isPending}
									/>
								</div>
							)}
						/>
					)}

					<Button
						type='submit'
						disabled={isPending}
						className='w-full cursor-pointer'
					>
						{isPending
							? t('profile.sending')
							: isShowTwoFactor
								? t('profile.confirmCode')
								: t('profile.sendConfirmation')}
					</Button>
					{isShowTwoFactor && (
							<Button
								type='button'
								variant={'link'}
								className='w-full'
								onClick={backHandler}
								disabled={isPending}
							>
								{t('back')}
							</Button>
						)}
				</form>
			</DialogContent>
		</Dialog>
	)
}
