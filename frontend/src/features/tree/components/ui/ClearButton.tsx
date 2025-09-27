import { useReactFlow } from '@xyflow/react'
import React, { useEffect, useState } from 'react'

import { Button } from '@/shared/components'

import { useAppSelector } from '../../hooks/useHooks'
import { TreeNode } from '../../types'
import { useTranslation } from 'react-i18next'


interface Props {
	className?: string
	nodes: TreeNode[]
}

export const ClearButton: React.FC<Props> = ({ className }) => {
	const { setNodes, setEdges, getNodes } = useReactFlow()
	const { t } = useTranslation('tree');
	const nodesState = useAppSelector(state => state.tree.nodes)
	const edgesState = useAppSelector(state => state.tree.edges)
	const [toggle, setToggle] = useState(getNodes().length > 0)
	const [disabled, setDisabled] = useState(
		getNodes().length <= 0 || nodesState.length <= 0
	)

	useEffect(() => {
		setToggle(true)
		setDisabled(false)

		if (nodesState.length <= 0 && getNodes().length <= 0) {
			setDisabled(true)
		}

		if (getNodes().length <= 0 && nodesState.length > 0) {
			setToggle(false)
		}
	}, [getNodes(), nodesState])

	const clearCanvas = ()  => {
		if (getNodes().length > 0) {
			setNodes([])
			setEdges([])
		} else {
			setNodes(nodesState)
			setEdges(edgesState)
		}
	}

	return (
		<Button
			variant='secondary'
			onClick={clearCanvas}
			className={className}
			disabled={disabled}
		>
			{toggle ? t('button.clearCanvas') : t('button.restore')}
		</Button>
	)
}
