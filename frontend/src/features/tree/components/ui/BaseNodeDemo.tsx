'use client'

import { memo, useEffect, useState } from 'react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	BaseHandle,
	BaseNode,
	Button,
	DropdownMenuSeparator,
	NodeHeader,
	NodeHeaderActions,
	NodeHeaderIcon,
	NodeHeaderTitle,
	NodeStatusIndicator
} from '@/shared/components'

import { sendNode, toggleTab } from '../../hooks'
import { useAppDispatch } from '../../hooks/useHooks'
import { IProps, TreeNode } from '../../types/tree.types'

import { NodePopover } from './NodePopover'
import { ArrowRightCircle } from 'lucide-react'

export const BaseNodeDemo = memo(
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
			<NodeStatusIndicator status={data.status} variant='border'>
				<BaseNode
					style={{
						backgroundColor: data?.style?.backgroundColor,
						color: data?.style?.color
					}}
					selected={selected}
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

					<NodeHeader className={`-mx-3 -mt-2`}>
						<NodeHeaderIcon>
							<Avatar>
								<AvatarImage
									src={
										data.img
											? data.img
											: '/images/image.png'
									}
									alt='avatar'
								/>
								<AvatarFallback>
									{data.label?.slice(0, 1) || ''}
								</AvatarFallback>
							</Avatar>
						</NodeHeaderIcon>
						<NodeHeaderTitle className='text-[8px] text-ellipsis whitespace-nowrap'>
							{data.label}
						</NodeHeaderTitle>
						<NodeHeaderActions>
							<NodePopover
								img={data.img}
								label={data.label}
								bio={data.bio}
							>
								<Button
									variant='ghost'
									size='sm'
									type='button'
									className='h-6 w-6 rounded-full p-0'
									aria-label={t('menu-node')}
								>
									<ArrowRightCircle className='h-6 w-6 cursor-pointer text-gray-600' />
								</Button>
							</NodePopover>
							<DropdownMenuSeparator />
						</NodeHeaderActions>
					</NodeHeader>
				</BaseNode>
			</NodeStatusIndicator>
		)
	}
)
