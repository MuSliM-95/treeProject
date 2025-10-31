'use client'

import { LucideLoader2 } from 'lucide-react'
import { TFunction } from 'next-i18next'
import React from 'react'

interface SpinnerOverlayProps {
	t: TFunction
}

export const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({ t }) => {
	return (
		<div className='fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-white/30 backdrop-blur-sm transition-opacity'>
			<div className='text-muted-foreground flex min-h-screen items-center justify-center'>
				<LucideLoader2 className='mr-2 size-5 animate-spin' />
				{t('loading')}...
			</div>
		</div>
	)
}
