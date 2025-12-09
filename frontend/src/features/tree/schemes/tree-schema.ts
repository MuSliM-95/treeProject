import { z } from 'zod'

import { HandlesBehavior, Status } from '../types'

export const treePatternSchema = z.object({
	nodeTextColor: z.string().min(1),
	nodeColor: z.string().min(1),
	edgeColor: z.string().min(1),

	nodeText: z.boolean(),
	nodeColorCheckbox: z.boolean(),
	isAnimatedNode: z.boolean(),
	flexibleKnots: z.boolean(),
	isAnimatedEdge: z.boolean(),
	color: z.boolean(),
	showHandles: z.boolean(),
	togglePens: z.string(),
	
	currentStatus: z.nativeEnum(Status)
})

export type TreePatternForm = z.infer<typeof treePatternSchema>
