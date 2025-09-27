import { Node, Position } from '@xyflow/react'

export const initialNodes: Node[] = [
	{
		id: '1',
		data: { label: 'Node 1' },
		position: { x: 0, y: 0 },
		type: 'baseNode',
		sourcePosition: Position.Top,
		targetPosition: Position.Bottom
	},
	{
		id: '2',
		data: { label: 'Node 2' },
		position: { x: 0, y: 150 },
		type: 'baseNode',
		sourcePosition: Position.Top,
		targetPosition: Position.Bottom
	},
	{
		id: '3',
		data: { label: 'Node 3' },
		position: { x: 250, y: 0 },
		type: 'baseNode',
		sourcePosition: Position.Top,
		targetPosition: Position.Bottom
	},
	{
		id: '4',
		data: { label: 'Node' },
		position: { x: 350, y: 150 },
		type: 'baseNode',
		sourcePosition: Position.Top,
		targetPosition: Position.Bottom
	}
]

export const initialEdges = [
	{ id: 'e1-2', source: '1', target: '2' },
	{ id: 'e1-3', source: '2', target: '3' }
]


