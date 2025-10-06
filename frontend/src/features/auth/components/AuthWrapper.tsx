'use client'

import Link from 'next/link'
import { type PropsWithChildren } from 'react'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/components'

import { AuthSocial } from './AuthSocial'
import { useTranslation } from 'react-i18next'

interface AuthWrapperProps {
	heading: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
	isShowSocial?: boolean
}

export function AuthWrapper({
	children,
	heading,
	description,
	backButtonLabel,
	backButtonHref,
	isShowSocial = false
}: PropsWithChildren<AuthWrapperProps>) {
	const { t } = useTranslation('auth')
	return (
		<div className='relative flex min-h-screen flex-col rounded-lg border border-[#d2c5b3] bg-[#f7f2e9]  text-[#3f2e21] shadow'>
			<div className='flex h-screen w-full items-center justify-center px-4'>
				<Card className='w-[400px]'>
					<CardHeader className='space-y-2'>
						<CardTitle>{heading}</CardTitle>
						{description && (
							<CardDescription>{description}</CardDescription>
						)}
					</CardHeader>
					<CardContent>
						{isShowSocial && <AuthSocial />}
						{children}
					</CardContent>
					<CardFooter>
						{backButtonLabel && backButtonHref && (
							<Button
								variant='link'
								className='w-full font-normal'
							>
								<Link href={backButtonHref}>
									{backButtonLabel}
								</Link>
							</Button>
						)}
					</CardFooter>
					<Button variant='link' className='w-full font-normal mt-[-20px]'>
						<Link href={'/'}>{t('auth-form.auth_wrapper.link')}</Link>
					</Button>
				</Card>
			</div>
		</div>
	)
}
