import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { BackgroundVariant, Viewport } from '@xyflow/react'

import {
	HandlesBehavior,
	ITree,
	NodeType,
	Status,
	Theme,
	TreeEdge,
	TreeNode
} from '../types/tree.types'

export interface IInitialState {
	node: TreeNode | null
	edge: TreeEdge | null
	tab: string
	nodes: TreeNode[]
	edges: TreeEdge[]
	pens: boolean
	animatedEdge: boolean
	flexibleKnots: boolean
	handlesBehavior: HandlesBehavior
	edgeColor: string
	nodeColor: string
	nodeTextColor: string
	nodeType: string
	edgeType: string
	theme: Theme
	background: BackgroundVariant
	viewport: Viewport
	sevButtonActivate: boolean
	nodesStatus: Status
}

const initialState: IInitialState = {
	node: null,
	edge: null,
	tab: 'tree',
	handlesBehavior: HandlesBehavior.TOP_BOTTOM,
	nodes: [],
	edges: [],
	pens: true,
	animatedEdge: false,
	flexibleKnots: true,
	edgeColor: '#b1b1b7',
	nodeColor: '#ffffff',
	nodeTextColor: '#000000',
	nodeType: NodeType.BASE_NODE,
	edgeType: '',
	theme: Theme.LIGHT,
	background: BackgroundVariant.Dots,
	viewport: {
		x: 0,
		y: 0,
		zoom: 1
	},
	sevButtonActivate: true,
	nodesStatus: Status.INITIAL
}

const treeReducer = createSlice({
	name: 'tree',
	initialState,
	reducers: {
		sendNode(state, action: PayloadAction<{ data: TreeNode }>) {
			state.node = action.payload.data
		},

		sendEdge(state, action: PayloadAction<{ data: TreeEdge }>) {
			state.edge = action.payload.data
		},

		togglePens(state, action: PayloadAction<{ data: boolean }>) {
			state.pens = action.payload.data
		},

		clearNodeEdge(state, action) {
			state.node = null
			state.edge = null
		},

		sendTree(state, action: PayloadAction<{ tree: ITree }>) {
			state.nodes = action.payload.tree.nodes
			state.edges = action.payload.tree.edges
		},

		saveChanges(
			state,
			action: PayloadAction<{
				data: {
					edgeType: string
					nodes: TreeNode[]
					edges: TreeEdge[]
					theme: Theme
					viewport: Viewport
					background: BackgroundVariant
					nodesStatus: Status
					animatedEdge: boolean
					flexibleKnots: boolean
					pens: boolean
					edgeColor: string
					nodeColor: string
					nodeTextColor: string
					handlesBehavior: HandlesBehavior
				}
			}>
		) {
			state.edgeType = action.payload.data.edgeType
			state.flexibleKnots = action.payload.data.flexibleKnots
			state.nodes = action.payload.data.nodes
			state.edges = action.payload.data.edges
			state.theme = action.payload.data.theme
			state.background = action.payload.data.background
			state.viewport = action.payload.data.viewport
			state.nodesStatus = action.payload.data.nodesStatus
			state.animatedEdge = action.payload.data.animatedEdge
			state.pens = action.payload.data.pens
			state.edgeColor = action.payload.data.edgeColor
			state.nodeColor = action.payload.data.nodeColor
			state.nodeTextColor = action.payload.data.nodeTextColor
			state.handlesBehavior = action.payload.data.handlesBehavior
		},

		toggleTab(state, action: PayloadAction<{ tab: string }>) {
			state.tab = action.payload.tab
		},

		buttonActivate(state, action: PayloadAction<{ activate: boolean }>) {
			state.sevButtonActivate = action.payload.activate
		}
	}
})

export const {
	sendNode,
	clearNodeEdge,
	saveChanges,
	sendTree,
	toggleTab,
	sendEdge,
	togglePens,
	buttonActivate
} = treeReducer.actions
export default treeReducer.reducer
