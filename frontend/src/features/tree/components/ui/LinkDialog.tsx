'use client'

import { Copy, RotateCw } from 'lucide-react'
import { TFunction } from 'next-i18next'
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input
} from '@/shared/components'

interface Props {
	className?: string
	showDialog: boolean
	isPending: boolean
	setShowDialog: Dispatch<SetStateAction<boolean>>
	t: TFunction
	link?: string
	errMessage?: string
	handleCreateLink: (update?: boolean) => void
}

export const LinkDialog: React.FC<Props> = ({
	className,
	showDialog,
	setShowDialog,
	isPending,
	t,
	link,
	errMessage,
	handleCreateLink
}) => {
	const handleCopy = async () => {
		if (!link) return
		try {
			await navigator.clipboard.writeText(link)
			toast.success(t('tree-link.linkCopied'))
		} catch (error) {
			toast.error(t('tree-link.copyFailed'))
		}
	}

	return (
		<Dialog open={showDialog} onOpenChange={setShowDialog}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('share-link.shareLink')}</DialogTitle>
					<DialogTitle className='text-muted-foreground text-sm'>
						{t('share-link.mustCreateNewLink')}
					</DialogTitle>
				</DialogHeader>

				<DialogFooter className='mt-4 flex flex-col'>
					{isPending ? (
						<DialogTitle className='text-muted-foreground flex-1 text-lg'>
							{t('loading...')}
						</DialogTitle>
					) : link ? (
						<Input value={link} readOnly />
					) : (
						<DialogTitle className='text-muted-foreground flex-1 text-sm'>
							{errMessage?.split('.')[0]}
						</DialogTitle>
					)}
					<Button
						className='cursor-pointer'
						disabled={!link || isPending}
						onClick={handleCopy}
					>
						<Copy />
					</Button>
					<Button
						className='cursor-pointer'
						disabled={isPending}
						onClick={() => handleCreateLink(true)}
					>
						<RotateCw />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
