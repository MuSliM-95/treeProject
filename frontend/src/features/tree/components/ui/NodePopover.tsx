'use client'

import { ExternalLink, User2 } from 'lucide-react'

import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components'


interface Props {
	img: string
	label: string
	bio: string
	children: React.ReactNode
}

export function NodePopover({ children, img, label, bio }: Props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
	             {children}
			</PopoverTrigger>

			<PopoverContent
				className="w-[360px] p-6 rounded-2xl shadow-2xl border bg-white"
				style={{
					position: 'fixed',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					zIndex: 50,
				}}
			>
				<div className="flex flex-col items-center space-y-4">
					{/* Аватар */}
					<Avatar className="w-24 h-24 border shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
						<AvatarImage
							src={img}
							alt={label}
							onClick={() => window.open(img, '_blank')}
						/>
						<AvatarFallback className="text-xl">
							{label[0]?.toUpperCase() || '?'}
						</AvatarFallback>
					</Avatar>

					{/* Имя и кнопка биографии */}
					<div className="text-center space-y-2">
						<h2 className="text-xl font-semibold tracking-tight text-gray-800 flex items-center justify-center gap-2">
							<User2 className="w-5 h-5" />
							{label}
						</h2>

						{bio && (
							<a
								href={bio}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
							>
								<ExternalLink className="w-4 h-4" />
								Смотреть биографию
							</a>
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
