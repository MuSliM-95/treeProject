'use client'

import { User } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { LuLogOut } from 'react-icons/lu'

import {
	Button,
	Card,
	CardContent,
	Separator,
	SpinnerOverlay
} from '@/shared/components'
import { BackButton } from '@/shared/components'
import { useProfile } from '@/shared/hooks'

import { useLogoutMutation } from '../hooks'

interface IProfile {}

export default function Profile({}: IProfile) {
	const { user, isLoading } = useProfile()
	const { t } = useTranslation('auth')
	const { logout, isLoadingLogout } = useLogoutMutation(t)

	if (!user) return null

	return (
		<>
			{(isLoading || isLoadingLogout) && <SpinnerOverlay t={t} />}
			<main className='bg-background text-foreground flex min-h-screen flex-col items-center justify-start px-4 py-10'>
				<BackButton t={t} path='/' />
				<section className='w-full max-w-md space-y-8'>
					{/* Карточка профиля */}
					<Card className='border-border/40 bg-card/60 rounded-2xl md:shadow-sm md:backdrop-blur-sm'>
						<Button
							variant={'link'}
							onClick={() => logout()}
							size='lg'
							className='absolute right-0 cursor-pointer rounded-xl hover:text-[red]'
						>
							<LuLogOut className='mr-2 size-4' />
						</Button>

						<CardContent className='space-y-6 p-8'>
							{/* Мини-аватар с инициалами */}
							<div className='flex items-center justify-center'>
								<div className='bg-muted/60 flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold'>
									{user.name?.[0]?.toUpperCase() || (
										<User className='h-6 w-6' />
									)}
								</div>
							</div>

							<div className='space-y-4 text-center'>
								<div>
									<p className='text-muted-foreground text-xs tracking-wide'>
										{t('profile.nameLabel')}
									</p>
									<p className='text-lg font-medium'>
										{user?.name || '—'}
									</p>
								</div>

								<div>
									<p className='text-muted-foreground text-xs tracking-wide'>
										Email
									</p>
									<p className='text-lg font-medium'>
										{user?.email || '—'}
									</p>
								</div>
							</div>

							<Separator />

							<div className='flex justify-center'>
								<Button
									asChild
									size='lg'
									className='rounded-xl'
								>
									<Link href='/dashboard/settings'>
										{t('profile.settingsTitle')}
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</section>
			</main>
		</>
	)
}
