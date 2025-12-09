'use client'

import { Dispatch, PropsWithChildren, RefObject, SetStateAction } from 'react'

import SidebarWithContent from '@/features/tree/components/menu/AppSidebar'
import { HandlesBehavior, Status, Theme } from '@/features/tree/types'

import { SidebarProvider, SidebarTrigger } from '../components'

interface ITreeSidebarProps extends PropsWithChildren<unknown> {
	treeRef: RefObject<HTMLDivElement | null>
	setTypeEdge: Dispatch<SetStateAction<string>>
	typeEdge: string
	setNodesStatus: Dispatch<SetStateAction<Status>>
	flexibleKnots: boolean
	setFlexibleKnots: Dispatch<SetStateAction<boolean>>
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

export default function TreeSidebarProvider({
	children,
	treeRef,
	setTypeEdge,
	flexibleKnots,
	setFlexibleKnots,
	typeEdge,
	setNodesStatus,
	setEdgeColor,
	setNodeColor,
	setNodeTextColor,
	edgeColor,
	nodeColor,
	nodeTextColor,
	theme,
	animatedEdge,
	setAnimatedEdge,
	pens,
	setPensState,
	handlesBehavior,
	setHandlesBehavior
}: ITreeSidebarProps) {
	return (
		<SidebarProvider>
			<SidebarWithContent
				flexibleKnots={flexibleKnots}
				setFlexibleKnots={setFlexibleKnots}
				setTypeEdge={setTypeEdge}
				typeEdge={typeEdge}
				setNodesStatus={setNodesStatus}
				setEdgeColor={setEdgeColor}
				setNodeColor={setNodeColor}
				setNodeTextColor={setNodeTextColor}
				edgeColor={edgeColor}
				nodeColor={nodeColor}
				nodeTextColor={nodeTextColor}
				treeRef={treeRef}
				theme={theme}
				animatedEdge={animatedEdge}
				setAnimatedEdge={setAnimatedEdge}
				pens={pens}
				setPensState={setPensState}
				handlesBehavior={handlesBehavior}
				setHandlesBehavior={setHandlesBehavior}
			/>
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	)
}
