import { Home } from 'lucide-react'
import Link from 'next/link'

import { BackButton } from '@/shared/components'
import { pageConfig } from '@/shared/config'

export default function NotFoundPage() {
	return (
		<div className='relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden'>
			{/* Фон */}
			<div className='absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.15]'>
				{/* Сетка */}
				<div
					className='absolute inset-0'
					style={{
						backgroundImage: `
							linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px),
							linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)
						`,
						backgroundSize: '50px 50px'
					}}
				/>

				{/* SVG ветки */}
				<svg
					viewBox='0 0 800 800'
					className='absolute inset-0 h-full w-full'
					fill='none'
					stroke='currentColor'
					strokeWidth='1.1'
				>
					<path d='M400 50 C350 120, 350 180, 400 240' />
					<path d='M400 50 C450 120, 450 180, 400 240' />
					<path d='M400 240 C320 330, 320 420, 400 500' />
					<path d='M400 240 C480 330, 480 420, 400 500' />
					<path d='M400 500 C370 560, 370 630, 400 700' />
					<path d='M400 500 C430 560, 430 630, 400 700' />
				</svg>
			</div>

			{/* 404 */}
			<h1 className='z-10 text-[120px] font-extrabold tracking-tight opacity-90 select-none'>
				404
			</h1>

			{/* Кнопка домой */}
			<Link
				href={pageConfig.home}
				className='border-muted-foreground/30 hover:border-muted-foreground/60 bg-background/70 z-10 mt-8 flex flex-col items-center justify-center rounded-full border p-3 backdrop-blur-sm transition-colors'
			>
				<Home className='h-6 w-6' />
				Home
			</Link>
		</div>
	)
}
