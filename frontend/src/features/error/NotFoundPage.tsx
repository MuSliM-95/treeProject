import Link from 'next/link'

import { Home } from 'lucide-react'
import { pageConfig } from '@/shared/config'

export default function NotFoundPage() {
	return (
		<div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">

			{/* Фон */}
			<div className="absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.15]">
				
				{/* Сетка */}
				<div 
					className="absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px),
							linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)
						`,
						backgroundSize: "50px 50px"
					}}
				/>

				{/* SVG ветки */}
				<svg
					viewBox="0 0 800 800"
					className="absolute inset-0 w-full h-full"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.1"
				>
					<path d="M400 50 C350 120, 350 180, 400 240" />
					<path d="M400 50 C450 120, 450 180, 400 240" />
					<path d="M400 240 C320 330, 320 420, 400 500" />
					<path d="M400 240 C480 330, 480 420, 400 500" />
					<path d="M400 500 C370 560, 370 630, 400 700" />
					<path d="M400 500 C430 560, 430 630, 400 700" />
				</svg>
			</div>

			{/* 404 */}
			<h1 className="text-[120px] font-extrabold tracking-tight opacity-90 select-none z-10">
				404
			</h1>

			{/* Кнопка домой */}
			<Link 
				href={pageConfig.home}
				className="
					mt-8 z-10 p-3 rounded-full 
					border border-muted-foreground/30 
					hover:border-muted-foreground/60
					transition-colors
					bg-background/70 backdrop-blur-sm
				"
			>
				<Home className="w-6 h-6" />
			</Link>
		</div>
	)
}
