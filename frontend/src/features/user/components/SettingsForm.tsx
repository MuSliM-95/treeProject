'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { AuthMethod } from '@/features/auth/types'

import {
	BackButton,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Loading,
	SpinnerOverlay,
	Switch
} from '@/shared/components'
import { useProfile } from '@/shared/hooks'

import { useUpdateProfileMutation } from '../hooks'
import { SettingsSchema, TypeSettingsSchema } from '../schemes'

import { ChangeDeleteProfileDialog } from './ChangeDeleteProfileDialog'
import { ChangePasswordDialog } from './ChangePasswordDialog'
import { EmailUpdate } from './EmailUpdate'
import { UserButton, UserButtonLoading } from './UserButton'
import { pageConfig } from '@/shared/config'
import dynamic from 'next/dynamic'

export const SettingsFormDynamic = dynamic(
	() => import('@features/user/components/SettingsForm').then(m => m.SettingsForm),
	{
		ssr: true,
		loading: () => <SpinnerOverlay />
	}
)

export function SettingsForm() {
	const { user, isLoading } = useProfile()
	const { t } = useTranslation('auth')

	const form = useForm<TypeSettingsSchema>({
		resolver: zodResolver(SettingsSchema),
		values: {
			name: user?.name || '',
			email: user?.email || '',
			isTwoFactorEnabled: user?.isTwoFactorEnabled || false
		}
	})

	const { update, isLoadingUpdate } = useUpdateProfileMutation(t)

	const onSubmit = (values: TypeSettingsSchema) => {
		update(values)
	}

	if (!user) return null

	return (
		<div className='relative flex min-h-screen flex-col'>
			<BackButton t={t} path={pageConfig.user.profile} />
			<div className='flex w-full items-center justify-center px-4'>
				<Card className='w-[450px] space-y-6'>
					<CardHeader className='flex flex-row items-center justify-between'>
						<CardTitle>{t('profile.settingsTitle')}</CardTitle>
						{isLoading ? (
							<UserButtonLoading />
						) : (
							<UserButton user={user} />
						)}
					</CardHeader>
					<CardContent className='space-y-8'>
						{isLoading ? (
							<Loading />
						) : (
							<>
								{/* 1. Основная информация */}
								<section>
									<h3 className='mb-2 text-lg font-semibold'>
										{t('profile.basicInfo')}
									</h3>
									<Form {...form}>
										<form
											onSubmit={form.handleSubmit(
												onSubmit
											)}
											className='space-y-4'
										>
											<FormField
												control={form.control}
												name='name'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t(
																'profile.nameLabel'
															)}
														</FormLabel>
														<FormControl>
															<Input
																placeholder={t(
																	'profile.namePlaceholder'
																)}
																disabled={
																	isLoadingUpdate
																}
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											{user.method ===
												AuthMethod.Credentials && (
												<FormField
													control={form.control}
													name='isTwoFactorEnabled'
													render={({ field }) => (
														<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
															<div className='space-y-0.5'>
																<FormLabel>
																	{t(
																		'profile.twoFactorLabel'
																	)}
																</FormLabel>
																<p className='text-muted-foreground text-sm'>
																	{t(
																		'profile.twoFactorDescription'
																	)}
																</p>
															</div>
															<FormControl>
																<Switch
																	checked={
																		field.value
																	}
																	onCheckedChange={
																		field.onChange
																	}
																/>
															</FormControl>
														</FormItem>
													)}
												/>
											)}

											<Button
												type='submit'
												disabled={isLoadingUpdate}
											>
												{t('profile.saveButton')}
											</Button>
										</form>
									</Form>
								</section>

								{user.method === AuthMethod.Credentials && (
									<>
										<section>
											<EmailUpdate
												email={form.getValues('email')}
											/>
										</section>
										<section>
											<ChangePasswordDialog
											/>
										</section>
									</>
								)}

								{/* 3. Удалить профиль */}
								<section>
									<ChangeDeleteProfileDialog />
								</section>
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
