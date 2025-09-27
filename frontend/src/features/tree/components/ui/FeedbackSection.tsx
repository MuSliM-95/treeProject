'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/components'

import { useAppSelector } from '../../hooks/useHooks'
import { ConfirmDialog } from '../menu/ConfirmDialog'
import { useReactFlow } from '@xyflow/react'

export function FeedbackSection() {
	const router = useRouter()
	const { t } = useTranslation('tree')
	const { getNodes } = useReactFlow()

	const activate = useAppSelector(state => state.tree.sevButtonActivate)
	const [showDialog, setShowDialog] = useState(false)

	const handleClick = () => {
		if (!activate && getNodes().length > 0) {
			setShowDialog(true)
		} else {
			router.push('/tree/feedback')
		}
	}

	return (
		<>
			<ConfirmDialog
				setShowDialog={setShowDialog}
				showDialog={showDialog}
				patch='/tree/feedback'
			/>
			<div className='space-y-8 bg-white p-4'>
				<h2 className='text-lg font-semibold'>{t('feedback.title')}</h2>
				<p className='text-muted-foreground text-sm'>
					{t('feedback.description')}
				</p>
				<Button onClick={handleClick} className='w-full'>
					{t('feedback.button')}
				</Button>
			</div>
		</>
	)
}
