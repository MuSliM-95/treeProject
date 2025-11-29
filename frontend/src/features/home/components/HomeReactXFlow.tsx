'use client'

import {
	Background,
	NodeTypes,
	ReactFlow,
	addEdge,
	useEdgesState,
	useNodesState
} from '@xyflow/react'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useEffect, useMemo } from 'react'

import { BaseNodeDemo } from '@/features/tree/components'
import { IProps } from '@/features/tree/types'

interface Props {
	className?: string
}

export const HomeReactXFlow: React.FC<Props> = ({ className }) => {
	const { t, i18n } = useTranslation()

	const [nodes, setNodes, onNodesChange] = useNodesState([])
	const [edges, setEdges, onEdgesChange] = useEdgesState([
		{ id: 'e1', source: 'mother', target: 'you', animated: true },
		{ id: 'e2', source: 'father', target: 'you', animated: true },
		{ id: 'e3', source: 'grandma', target: 'mother', animated: true },
		{ id: 'e4', source: 'grandpa', target: 'mother', animated: true },
		{
			id: 'e5',
			source: 'grandma-father',
			target: 'father',
			animated: true
		},
		{ id: 'e6', source: 'grandpa-father', target: 'father', animated: true }
	])

	const onConnect = useCallback(
		(params: any) => setEdges(eds => addEdge(params, eds)),
		[]
	)

	const nodeTypes = useMemo(
		() => ({
			baseNode: (props: IProps) => (
				<BaseNodeDemo {...props} pens={false} t={t} />
			)
		}),
		[t, i18n.language]
	)
	// Обновление узлов при изменении языка
	useEffect(() => {
		setNodes([
			{
				id: 'you',
				type: 'baseNode',
				position: { x: 400, y: 300 },
				data: { label: t('homepage.tree.you') }
			},
			{
				id: 'mother',
				type: 'baseNode',
				position: { x: 200, y: 150 },
				data: { label: t('homepage.tree.mother') }
			},
			{
				id: 'father',
				type: 'baseNode',
				position: { x: 650, y: 150 },
				data: { label: t('homepage.tree.father') }
			},
			{
				id: 'grandma',
				type: 'baseNode',
				position: { x: 80, y: 0 },
				data: { label: t('homepage.tree.grandma') }
			},
			{
				id: 'grandpa-father',
				type: 'baseNode',
				position: { x: 750, y: 0 },
				data: { label: t('homepage.tree.grandpa') }
			},
			{
				id: 'grandma-father',
				type: 'baseNode',
				position: { x: 540, y: 0 },
				data: { label: t('homepage.tree.grandma') }
			},
			{
				id: 'grandpa',
				type: 'baseNode',
				position: { x: 320, y: 0 },
				data: { label: t('homepage.tree.grandpa') }
			}
		] as any)
	}, [t, i18n.language]) // зависимость от языка

	return (
		<section className='mx-auto mt-24 max-w-7xl'>
			<div className='mb-8 text-center'>
				<h3 className='text-2xl font-semibold text-[#4a372a]'>
					{t('homepage.tree.title')}
				</h3>
				<p className='mt-2 text-[#6b5445]'>
					{t('homepage.tree.subtitle')}
				</p>
			</div>
			<div className='mx-auto h-[500px] w-full max-w-7xl rounded-xl border border-[#e5d6c5] shadow-md'>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes as unknown as NodeTypes}
					fitView
					className='z-10'
					defaultViewport={{ x: 200, y: 100, zoom: 0.9 }}
					selectNodesOnDrag={false}
				>
					<Background />
				</ReactFlow>
			</div>
		</section>
	)
}
