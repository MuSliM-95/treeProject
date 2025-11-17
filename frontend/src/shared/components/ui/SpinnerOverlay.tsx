'use client'

import { cn } from '@/shared/utils';
import { LucideLoader2 } from 'lucide-react'
import React from 'react'

interface SpinnerOverlayProps {
	className?: string;
	text?: string
}

export const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({ text, className }) => {
	return (
		<div className='fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-white/30 backdrop-blur-sm transition-opacity'>
			<div className='text-muted-foreground flex min-h-screen items-center justify-center'>
				<LucideLoader2 className={cn('mr-2 size-5 animate-spin', className)} />
				{text}
			</div>
		</div>
	)
}
