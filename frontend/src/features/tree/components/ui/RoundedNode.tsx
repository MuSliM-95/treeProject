'use client'

import { memo, useEffect, useState } from 'react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	BaseHandle,
	BaseNode,
	NodeHeaderIcon,
	NodeStatusIndicator
} from '@/shared/components'

import { sendNode, toggleTab } from '../../hooks'
import { useAppDispatch } from '../../hooks/useHooks'
import { IProps, TreeNode } from '../../types/tree.types'

export const RoundedNode = memo(
	({
		selected,
		id,
		data,
		type,
		positionAbsoluteX,
		positionAbsoluteY,
		sourcePosition,
		targetPosition,
		pens,
		t
	}: IProps) => {
		const dispatch = useAppDispatch()

		const [pensState, setPensState] = useState(pens)

		useEffect(() => {
			setPensState(pens)
		}, [pens])

		const newNode: TreeNode = {
			id,
			type,
			data,
			position: { x: positionAbsoluteX, y: positionAbsoluteY },
			sourcePosition,
			targetPosition
		}

		const handleNodeClick = () => {
			dispatch(sendNode({ data: newNode }))
			dispatch(toggleTab({ tab: 'node' }))
		}

		return (
			<NodeStatusIndicator  status={data.status} variant='border'>
				<BaseNode
					style={{
						backgroundColor: data?.style?.backgroundColor,
						color: data?.style?.color
					}}
					selected={selected}
					className='p-0 rounded-full'
					onClick={handleNodeClick}
				>
					<div>
						<BaseHandle
							id={id}
							type='target'
							position={targetPosition!}
							style={{
								visibility: pensState ? undefined : 'hidden'
							}}
						/>
						<BaseHandle
							id={id}
							type='source'
							position={sourcePosition!}
							style={{
								visibility: pensState ? undefined : 'hidden'
							}}
						/>
					</div>
						<NodeHeaderIcon className='[&>*]:size-25'>
							<Avatar >
								<AvatarImage
									src={
										data.img
											? data.img
											: '/images/image.png'
									}
									sizes='1000'
									alt='avatar'
								/>
								<AvatarFallback>
									{data.label?.slice(0, 1) || ''}
								</AvatarFallback>
							</Avatar>
						</NodeHeaderIcon>
				</BaseNode>
			</NodeStatusIndicator>
		)
	}
)
