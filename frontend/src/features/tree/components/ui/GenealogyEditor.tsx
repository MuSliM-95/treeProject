'use client'

import { BaseNodeDemo, SaveButton } from '..'
import {
	Background,
	BackgroundVariant,
	Connection,
	Edge,
	EdgeChange,
	NodeChange,
	ReactFlow,
	Viewport,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	useEdgesState,
	useNodesState,
	useReactFlow
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import React, {
	Dispatch,
	RefObject,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'

import {
	buttonActivate,
	clearNodeEdge,
	sendEdge,
	sendNode,
	toggleTab
} from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../hooks/useHooks'
import { HandlesBehavior, IProps, Status, Theme, TreeEdge, TreeNode } from '../../types'

import { BackgroundType } from './BackgroundType'
import { CenterButton } from './CenterButton'
import { ClearButton } from './ClearButton'
import { ThemePane } from './ThemePane'
import { TreeTitleNode } from './TreeTitleNode'


interface IGenealogyEditorProps {
	edgeColor: string
	nodeColor: string
	nodeTextColor: string
	treeRef: RefObject<HTMLDivElement | null>
	nodesStatus: Status
	theme: Theme
	setTheme: Dispatch<SetStateAction<Theme>>
	animatedEdge: boolean
	handlesBehavior: HandlesBehavior
	pens: boolean
}

export default function GenealogyEditor({
	treeRef,
	nodesStatus,
	edgeColor,
	nodeColor,
	nodeTextColor,
	theme,
	setTheme,
	animatedEdge,
	handlesBehavior,
	pens
}: IGenealogyEditorProps) {
	const dispatch = useAppDispatch()
	const { setViewport } = useReactFlow()
	const viewportRef = useRef<Viewport | null>(null)

	const initialNodes = useAppSelector(state => state.tree.nodes)
	const initialEdges = useAppSelector(state => state.tree.edges)
	const tab = useAppSelector(state => state.tree.tab)

	const backgroundState = useAppSelector(state => state.tree.background)
	const viewport = useAppSelector(state => state.tree.viewport)

	const [nodes, setNodes] = useNodesState<any>(initialNodes || [])
	const [edges, setEdges] = useEdgesState<any>(initialEdges || [])

	const [background, setBackground] =
		useState<BackgroundVariant>(backgroundState)

	const edgeOptions = {
		animated: animatedEdge,
		style: {
			stroke: edgeColor
		}
	}

	const BOUND_X = 4000
	const BOUND_Y = 2000

	const MIN_X = -BOUND_X
	const MAX_X = BOUND_X
	const MIN_Y = -BOUND_Y
	const MAX_Y = BOUND_Y

	const onNodesChange = useCallback(
		(changes: NodeChange[]) =>
			setNodes(nodesSnapshot => applyNodeChanges(changes, nodesSnapshot)),
		[]
	)

	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) => {
			setEdges(es => applyEdgeChanges(changes, es))
			dispatch(buttonActivate({ activate: false }))
		},
		[dispatch]
	)

	useEffect(() => {
		if (viewport) {
			requestAnimationFrame(() => {
				setViewport(viewport)
			})
		}
	}, [viewport])

	const handleEdgeClick = useCallback(
		(_: any, edge: Edge) => {
			dispatch(sendEdge({ data: edge as TreeEdge }))
			dispatch(toggleTab({ tab: 'edge' }))
		},
		[dispatch]
	)

	const handlePaneClick = useCallback(() => {
		if (tab === 'edge') {
			dispatch(toggleTab({ tab: 'node' }))
		}
		dispatch(clearNodeEdge({}))
	}, [dispatch, tab])

	const nodeTypes = useMemo(
		() => ({
			baseNode: (props: IProps) => (
				<BaseNodeDemo {...props} pens={pens} />
			),
			treeTitle: TreeTitleNode
		}),
		[pens]
	)

	const handleMove = useCallback((_: any, vp: Viewport) => {
		viewportRef.current = vp
	}, [])

	const handleSave = useCallback(() => {
		return viewportRef.current ?? viewport
	}, [viewport])

	const onConnect = useCallback(
		(params: Connection) => {
			setEdges(eds => addEdge(params, eds))
			dispatch(buttonActivate({ activate: false }))
		},

		[setEdges]
	)

	return (
		<div
			ref={treeRef}
			className='absolute left-0 m-0 flex h-[96vh] max-h-full w-full max-w-full overflow-hidden border-none p-0 outline-0'
		>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				defaultEdgeOptions={edgeOptions}
				onConnect={onConnect}
				onNodeDragStop={(event, node) => {
					dispatch(sendNode({ data: node as TreeNode }))
					dispatch(buttonActivate({ activate: false }))
				}}
				onEdgeClick={handleEdgeClick}
				onPaneClick={handlePaneClick}
				onMove={handleMove}
				minZoom={0.2}
				maxZoom={2}
				translateExtent={[
					[MIN_X, MIN_Y],
					[MAX_X, MAX_Y]
				]}
				nodeExtent={[
					[MIN_X, MIN_Y],
					[MAX_X, MAX_Y]
				]}
				nodeTypes={nodeTypes as any}
				defaultViewport={{
					x: 0,
					y: 0,
					zoom: 1
				}}
				className='intersection-flow max-w-full'
				selectNodesOnDrag={false}
			>
				<div className='hide-on-export absolute top-2 right-2 z-50 flex w-[140px] flex-col space-y-2 sm:w-auto'>
					<SaveButton
						edgeColor={edgeColor}
						nodeColor={nodeColor}
						nodeTextColor={nodeTextColor}
						theme={theme}
						handleSave={handleSave}
						background={background}
						nodesStatus={nodesStatus}
						animatedEdge={animatedEdge}
						pens={pens}
						handlesBehavior={handlesBehavior}
						className='w-full min-w-0 sm:min-w-[120px] md:min-w-[140px] lg:min-w-[158px]'
					/>

					<ClearButton
						nodes={nodes}
						className='w-full min-w-0 sm:min-w-[120px] md:min-w-[140px] lg:min-w-[158px]'
					/>

					<CenterButton className='w-full min-w-0 sm:min-w-[120px] md:min-w-[140px] lg:min-w-[158px]' />
				</div>
				<div className='hide-on-export absolute top-1 right-45 flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-1'>
					<BackgroundType
						type={background}
						setBackground={setBackground}
					/>
					<ThemePane theme={theme} setTheme={setTheme} />
				</div>
				<Background
					bgColor={theme === Theme.DARK ? '#1e1e1e' : '#ffffff'}
					variant={background}
					gap={20}
					size={1}
				/>
			</ReactFlow>
		</div>
	)
}
