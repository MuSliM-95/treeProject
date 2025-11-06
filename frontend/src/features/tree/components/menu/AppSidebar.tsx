'use client'

import { FeedbackSection } from '..'
import { useReactFlow } from '@xyflow/react'
import {
	Download,
	ExternalLink,
	Home,
	LayoutTemplate,
	MessageSquare,
	Share2,
	Split
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'

import {
	Sidebar,
	SidebarContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/components'

import { toggleTab } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../hooks/useHooks'
import { HandlesBehavior, Status, Theme } from '../../types'
import { DownloadTreeButton } from '../ui/DownloadTreeButton'
import { ShareLink } from '../ui/ShareLink'

import { ConfirmDialog } from '../ui/ConfirmDialog'
import { EdgeForm } from './EdgeForm'
import { NodeForm } from './NodeForm'
import { TreePattern } from './TreePattern'

const tabs = [
	{ id: 'node', icon: Share2 },
	{ id: 'edge', icon: Split },
	{ id: 'tree', icon: LayoutTemplate },
	{ id: 'feedback', icon: MessageSquare },
	{ id: 'share_link', icon: ExternalLink },
	{ id: 'download', icon: Download }
]

interface ISidebarWithContent {
	treeRef: RefObject<HTMLDivElement | null>
	setNodesStatus: Dispatch<SetStateAction<Status>>
	setEdgeColor: Dispatch<SetStateAction<string>>
	setNodeColor: Dispatch<SetStateAction<string>>
	setNodeTextColor: Dispatch<SetStateAction<string>>
	edgeColor: string
	nodeColor: string
	nodeTextColor: string
	theme: Theme
	animatedEdge: boolean
	setAnimatedEdge: Dispatch<SetStateAction<boolean>>
	pens: boolean
	setPensState: Dispatch<SetStateAction<boolean>>
	setHandlesBehavior: Dispatch<SetStateAction<HandlesBehavior>>
	handlesBehavior: HandlesBehavior
}
export default function SidebarWithContent({
	treeRef,
	setNodesStatus,
	setEdgeColor,
	setNodeColor,
	setNodeTextColor,
	edgeColor,
	nodeColor,
	nodeTextColor,
	theme,
	setAnimatedEdge,
	animatedEdge,
	pens,
	setPensState,
	setHandlesBehavior,
	handlesBehavior
}: ISidebarWithContent) {
	const dispatch = useAppDispatch()
	const { getNodes, getEdges } = useReactFlow()
	const router = useRouter()
	const activate = useAppSelector(state => state.tree.sevButtonActivate)

	const selectedNode = useAppSelector(state => state.tree.node)

	const tab = useAppSelector(state => state.tree.tab)

	const [activeTab, setActiveTab] = useState(tab)
	const [showDialog, setShowDialog] = useState(false)
	const [link, setLink] = useState<string | undefined>('')

	useEffect(() => {
		setActiveTab(tab)
	}, [selectedNode, tab])

	const handleTogglePage = () => {
		if (!activate && getNodes().length > 0) {
			setShowDialog(true)
			dispatch(toggleTab({ tab: '/' }))
		} else {
			dispatch(toggleTab({ tab: 'node' }))
			router.push('/')
		}
	}

	return (
		<>
			<ConfirmDialog
				setShowDialog={setShowDialog}
				showDialog={showDialog}
				patch='/'
			/>
			<Sidebar collapsible='icon' className='hide-on-export'>
				<div className='flex h-full w-full'>
					<div className='bg-muted w-14 border-r'>
						{' '}
						<SidebarMenu>
							<SidebarMenuButton onClick={handleTogglePage}>
								<Home
									className={
										activeTab === '/'
											? 'h-4 w-4 cursor-pointer text-red-500'
											: 'h-4 w-4 cursor-pointer'
									}
								/>
							</SidebarMenuButton>
							{tabs.map(({ id, icon: Icon }) => (
								<SidebarMenuItem key={id}>
									<SidebarMenuButton
										className={
											activeTab === id &&
											activeTab !== '/'
												? 'text-red-500 cursor-pointer'
												: 'cursor-pointer'
										}
										onClick={() =>
											dispatch(toggleTab({ tab: id }))
										}
									>
										<Icon className='h-5 w-5' />
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</div>
					<SidebarContent className='bg-white'>
						{activeTab === 'node' && (
							<NodeForm
								selectedNode={selectedNode}
								nodeColor={nodeColor}
								nodeTextColor={nodeTextColor}
								animatedEdge={animatedEdge}
							/>
						)}
						{activeTab === 'edge' && (
							<EdgeForm edgeColor={edgeColor} />
						)}

						{activeTab === 'tree' && (
							<TreePattern
								edgeColor={edgeColor}
								setEdgeColor={setEdgeColor}
								setNodeColor={setNodeColor}
								setNodeTextColor={setNodeTextColor}
								nodeColor={nodeColor}
								nodeTextColor={nodeTextColor}
								animatedEdge={animatedEdge}
								pens={pens}
								edgeCount={getEdges().length}
								nodeCount={getNodes().length}
								setNodesStatus={setNodesStatus}
								setAnimatedEdge={setAnimatedEdge}
								setPensState={setPensState}
								setHandlesBehavior={setHandlesBehavior}
								handlesBehavior={handlesBehavior}
							/>
						)}
						{activeTab === 'feedback' && <FeedbackSection />}
						{activeTab === 'share_link' && <ShareLink link={link} setLink={setLink} />}
						{activeTab === 'download' && (
							<DownloadTreeButton
								treeRef={treeRef}
								nodes={getNodes()}
								edges={getEdges()}
								theme={theme}
							/>
						)}
					</SidebarContent>
				</div>
			</Sidebar>
		</>
	)
}
