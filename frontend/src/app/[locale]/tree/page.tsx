'use client'

import { ReactFlowProvider } from '@xyflow/react'
import { useEffect, useRef, useState } from 'react'
import { I18nextProvider } from 'react-i18next'

import GenealogyEditor from '@/features/tree/components/ui/GenealogyEditor'
import { useAppSelector } from '@/features/tree/hooks/useHooks'
import { HandlesBehavior, Status, Theme } from '@/features/tree/types'

import TreeSidebarProvider from '@/shared/providers/SidebarProvider'
import i18n from '@/shared/utils/i18n/i18n-client'
import { usePathname } from 'next/navigation'

export default function TreePage() {
	const pathname = usePathname()
	const lang = pathname.split('/')[1]
	useEffect(() => {
		i18n.changeLanguage(lang)
	}, [lang])

	
	const animated = useAppSelector(state => state.tree.animatedEdge)
	const themeState = useAppSelector(state => state.tree.theme)
	const edgeColorState = useAppSelector(state => state.tree.edgeColor)
	const treeColorState = useAppSelector(state => state.tree.nodeColor)
	const nodeTextColorState = useAppSelector(state => state.tree.nodeTextColor)
	const handles_behavior = useAppSelector(state => state.tree.handlesBehavior)
	const pens = useAppSelector(state => state.tree.pens)
	const treeRef = useRef<HTMLDivElement>(null)

	const [nodesStatus, setNodesStatus] = useState<Status>(Status.INITIAL)
	const [animatedEdge, setAnimatedEdge] = useState(animated)
	const [theme, setTheme] = useState<Theme>(themeState)
	const [pensState, setPensState] = useState(pens)
	const [edgeColor, setEdgeColor] = useState(edgeColorState)
	const [nodeColor, setNodeColor] = useState(treeColorState)
	const [nodeTextColor, setNodeTextColor] = useState(nodeTextColorState)
	const [handlesBehavior, setHandlesBehavior] =
		useState<HandlesBehavior>(handles_behavior)

	return (
		<I18nextProvider i18n={i18n}>
			<ReactFlowProvider>
				<TreeSidebarProvider
					setPensState={setPensState}
					setEdgeColor={setEdgeColor}
					setNodeColor={setNodeColor}
					edgeColor={edgeColor}
					nodeColor={nodeColor}
					nodeTextColor={nodeTextColor}
					setNodeTextColor={setNodeTextColor}
					pens={pensState}
					animatedEdge={animatedEdge}
					setAnimatedEdge={setAnimatedEdge}
					theme={theme}
					setNodesStatus={setNodesStatus}
					treeRef={treeRef}
					setHandlesBehavior={setHandlesBehavior}
					handlesBehavior={handlesBehavior}
				>
					<GenealogyEditor
						edgeColor={edgeColor}
						nodeColor={nodeColor}
						nodeTextColor={nodeTextColor}
						pens={pensState}
						animatedEdge={animatedEdge}
						theme={theme}
						setTheme={setTheme}
						nodesStatus={nodesStatus}
						treeRef={treeRef}
						handlesBehavior={handlesBehavior}
					/>
				</TreeSidebarProvider>
			</ReactFlowProvider>
		</I18nextProvider>
	)
}
