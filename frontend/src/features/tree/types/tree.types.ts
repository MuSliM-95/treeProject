import { HandleType, NodeProps, Position } from '@xyflow/react'

import { NodeStatus } from '@/shared/components'

export type TreeNode = {
	id: string
	data: NodeDataType
	position: PositionType
	type?: string
	style?: NodeStyle
	sourcePosition?: Position
	targetPosition?: Position
}

export type TreeEdge = {
	id: string
	source: string
	target: string
	style?: {
		stroke: string
	}
	animated: boolean
}

export type PositionType = {
	x: number
	y: number
}
export type NodeStyle = {
	backgroundColor: string
	color: string
}

export type NodeDataType = {
	label: string
	status: NodeStatus
	style: {
		backgroundColor: string
		color: string
	}
	img: string
	bio: string
}

export interface IProps extends NodeProps {
	data: NodeDataType
	type: HandleType
	style: NodeStyle
	pens: boolean
}

// Вместо enum Theme
export const Theme = {
	LIGHT: 'light',
	DARK: 'dark',
} as const

export type Theme = (typeof Theme)[keyof typeof Theme]

// Вместо enum Status
export const Status = {
	LOADING: 'loading',
	ERROR: 'error',
	SUCCESS: 'success',
	INITIAL: 'initial',
} as const

export type Status = (typeof Status)[keyof typeof Status]

// Вместо enum HandlesBehavior
export const HandlesBehavior = {
	TOP_BOTTOM: 'top-bottom',
	TOP: 'top',
} as const

export type HandlesBehavior = (typeof HandlesBehavior)[keyof typeof HandlesBehavior]

export interface ITree {
	nodes: TreeNode[]
	edges: TreeEdge[]
}

export interface ITreeLink  {
	link?: string
} 