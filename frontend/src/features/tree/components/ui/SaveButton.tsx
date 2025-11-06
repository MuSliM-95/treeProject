'use client'

import { BackgroundVariant, Viewport, useReactFlow } from '@xyflow/react'
import '@xyflow/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { Button } from '@/shared/components'

import { buttonActivate, saveChanges } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../hooks/useHooks'
import { HandlesBehavior, Status, Theme, TreeEdge, TreeNode } from '../../types'

interface Props {
	edgeColor: string
	nodeColor: string
	nodeTextColor: string
	theme: Theme
	background: BackgroundVariant
	nodesStatus: Status
	className?: string
	handleSave: () => Viewport
	animatedEdge: boolean
	pens: boolean
	handlesBehavior: HandlesBehavior
}

export const SaveButton: React.FC<Props> = ({
	edgeColor,
	nodeColor,
	nodeTextColor,
	theme,
	background,
	nodesStatus,
	className,
	handleSave,
	animatedEdge,
	pens,
	handlesBehavior
}) => {
	const dispatch = useAppDispatch()

	const activate = useAppSelector(state => state.tree.sevButtonActivate)

	const { getEdges, getNodes } = useReactFlow()
	const { t } = useTranslation('tree')

	const handlerSaveTree = () => {
		const viewport = handleSave()
		const nodes = getNodes() as TreeNode[]
		const edges = getEdges() as TreeEdge[]
		dispatch(
			saveChanges({
				data: {
					nodes,
					edges,
					theme,
					viewport,
					background,
					nodesStatus,
					animatedEdge,
					pens,
					edgeColor,
					nodeColor,
					nodeTextColor,
					handlesBehavior
				}
			})
		)
		dispatch(buttonActivate({ activate: true }))
		toast.success(t('button_save_tree.treeSaved'))
	}

	return (
		<Button
			disabled={activate}
			onClick={handlerSaveTree}
			className={className}
		>
			{t('button_save_tree.saveTree')}
		</Button>
	)
}
