import { useReactFlow } from '@xyflow/react'
import { Share2 } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Button } from '@/shared/components'

import { useCreateLinkMutation } from '../../hooks/useCreateLinkMutation'
import { TreeEdge, TreeNode } from '../../types'

import { LinkDialog } from './LinkDialog'

interface Props {
	className?: string
	link?: string
	setLink: Dispatch<SetStateAction<string | undefined>>
}

export const ShareLink: React.FC<Props> = ({ className, link, setLink }) => {
	const { t } = useTranslation('tree')
	const [showDialog, setShowDialog] = useState(false)

	const { getNodes, getEdges } = useReactFlow()

	const { createLink, isPending, data, error } = useCreateLinkMutation()

	useEffect(() => {
		if (data?.link) setLink(data.link)
	}, [data, setLink])

	const handleCreateLink = (update: boolean = false) => {
		setShowDialog(true)
		if (link && !update) return
		const nodes = getNodes() as TreeNode[]
		const edges = getEdges() as TreeEdge[]

		createLink({
			nodes,
			edges
		})
	}

	return (
		<div className={className}>
			{showDialog && (
				<LinkDialog
					showDialog={showDialog}
					setShowDialog={setShowDialog}
					isPending={isPending}
					t={t}
					link={link}
					errMessage={error?.message}
					handleCreateLink={handleCreateLink}
				/>
			)}
			<div className='space-y-8 bg-white p-4'>
				<h2 className='text-lg font-semibold'>
					{t('share-link.title')}
				</h2>
				<p className='uppercase'>{t('share-link.name')}</p>
				<Button onClick={() => handleCreateLink()} className='w-full cursor-pointer'>
					<Share2 />
					{t('share-link.button')}
				</Button>
				<p className='text-muted-foreground text-center text-sm'>
					{t('share-link.changesRequireNewLink')}
				</p>
			</div>
		</div>
	)
}
