'use client'

import React from 'react'

import { Label, Progress } from '@/shared/components'

interface SpinnerOverlayProps {
	text?: string
}

export const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({ text }) => {
	return (
		<div className='fixed inset-0 z-50 flex items-center flex-col space-y-4 justify-center bg-white/30 backdrop-blur-sm transition-opacity'>
			<Label>{text}</Label>
			<Progress value={50} className='w-3xl' />
		</div>
	)
}
