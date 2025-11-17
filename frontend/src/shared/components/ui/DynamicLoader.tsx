import { LucideLoader2 } from 'lucide-react'
import React from 'react'

export const DynamicLoader: React.FC = () => {
	return (
		<div className='flex min-h-[70vh] items-center justify-center'>
			<LucideLoader2 className='text-muted-foreground mr-2 size-10 animate-spin' />
		</div>
	)
}
