'use client'


import { Link as LinkIcon } from 'lucide-react'

interface CopyLinkButtonProps {
	id: string
}

export default function CopyLinkButton({ id }: CopyLinkButtonProps) {
	const handleCopyLink = () => {
		const url = `${window.location.origin}${window.location.pathname}#${id}`
		navigator.clipboard.writeText(url)
	}

	return (
		<div
			className='absolute right-10 flex cursor-copy items-center h-6 w-6 opacity-60 hover:opacity-100'
			onClick={handleCopyLink}
			title='Copy link'
		>
			<LinkIcon className='h-3 w-3' />
		</div>
	)
}
