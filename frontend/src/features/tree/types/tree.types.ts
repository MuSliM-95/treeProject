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

export enum Theme {
	'LIGHT' = 'light',
	'DARK' = 'dark'
}

export enum Status {
	LOADING = 'loading',
	ERROR = 'error',
	SUCCESS = 'success',
	INITIAL = 'initial'
}

export enum HandlesBehavior {
	'TOP-BOTTOM' = 'top-bottom',
	TOP = 'top'
}

export interface ITree {
	nodes: TreeNode[]
	edges: TreeEdge[]
}

export interface ITreeLink  {
	link?: string
} 