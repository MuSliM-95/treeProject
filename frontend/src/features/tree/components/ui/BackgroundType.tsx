import { BackgroundVariant } from '@xyflow/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/utils'

import { buttonActivate } from '../../hooks'
import { useAppDispatch } from '../../hooks/useHooks'

interface Props {
	setBackground: React.Dispatch<React.SetStateAction<BackgroundVariant>>
	type: BackgroundVariant
	className?: string
}

export const BackgroundType: React.FC<Props> = ({
	setBackground,
	type,
	className
}) => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation('tree')

	const handleTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setBackground(e.target.value as BackgroundVariant)
		dispatch(buttonActivate({ activate: false }))
	}

	return (
		<div
			className={cn(
				'z-50 w-[140px] rounded-lg px-3 py-1 sm:top-0 sm:right-[200px]',
				className
			)}
		>
			<form className='flex flex-col gap-1 bg-white'>
				<select
					id='background-select'
					name='background'
					className='rounded border border-gray-300 p-1 text-sm'
					onChange={handleTheme}
					defaultValue={type}
				>
					<option value={BackgroundVariant.Cross}>
						{t('backgroundVariants.cross')}
					</option>
					<option value={BackgroundVariant.Dots}>
						{t('backgroundVariants.dots')}
					</option>
					<option value={BackgroundVariant.Lines}>
						{t('backgroundVariants.lines')}
					</option>
				</select>
			</form>
		</div>
	)
}
