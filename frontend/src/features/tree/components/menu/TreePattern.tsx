'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Position, useReactFlow } from '@xyflow/react'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
	Button,
	Card,
	Checkbox,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input
} from '@/shared/components'

import { useAppSelector } from '../../hooks/useHooks'
import { TreePatternForm, treePatternSchema } from '../../schemes'
import { HandlesBehavior, Status, TreeNode } from '../../types'
import { toast } from 'sonner'

interface Props {
	className?: string
	nodeCount: number
	edgeCount: number
	pens: boolean
	setPensState: Dispatch<SetStateAction<boolean>>
	setEdgeColor: Dispatch<SetStateAction<string>>
	setNodeColor: Dispatch<SetStateAction<string>>
	setNodeTextColor: Dispatch<SetStateAction<string>>
	edgeColor: string
	nodeColor: string
	nodeTextColor: string
	animatedEdge: boolean
	setNodesStatus: Dispatch<SetStateAction<Status>>
	setAnimatedEdge: Dispatch<SetStateAction<boolean>>
	setHandlesBehavior: Dispatch<SetStateAction<HandlesBehavior>>
	handlesBehavior: HandlesBehavior
}

export const TreePattern: React.FC<Props> = ({
	className,
	nodeCount = 0,
	edgeCount = 0,
	pens,
	setPensState,
	setEdgeColor,
	setNodeColor,
	setNodeTextColor,
	edgeColor,
	nodeColor,
	nodeTextColor,
	animatedEdge,
	setAnimatedEdge,
	setNodesStatus,
	setHandlesBehavior,
	handlesBehavior
}) => {
	const { setEdges, setNodes } = useReactFlow()
	const { t } = useTranslation('tree')

	const nodesStatus = useAppSelector(state => state.tree.nodesStatus)

	const form = useForm<TreePatternForm>({
		resolver: zodResolver(treePatternSchema),
		defaultValues: {
			nodeTextColor,
			nodeColor,
			edgeColor,
			nodeText: false,
			nodeColorCheckbox: false,
			isAnimatedNode: false,
			isAnimatedEdge: animatedEdge,
			color: false,
			showHandles: pens,
			currentStatus: nodesStatus,
			togglePens: handlesBehavior
		}
	})


	const handlerUpdate = (values: TreePatternForm) => {
		setEdges(edges =>
			edges.map(edge => ({
				...edge,
				style: values.color
					? { ...edge.style, stroke: values.edgeColor }
					: edge.style,
				animated: values.isAnimatedEdge
			}))
		)

		setNodes(nodes =>
			nodes.map(node => ({
				...node,
				data: {
					...node.data,
					status: values.isAnimatedNode
						? values.currentStatus
						: node.data.status,
					style: {
						...(node.data.style || {}),
						backgroundColor: values.nodeColorCheckbox
							? values.nodeColor
							: (node as TreeNode)?.data?.style.backgroundColor,
						color: values.nodeText
							? values.nodeTextColor
							: (node as TreeNode)?.data?.style.color
					}
				},
				sourcePosition:
					form.getValues('togglePens') === HandlesBehavior.TOP
						? Position.Top
						: Position.Bottom
			}))
		)

		setNodesStatus(values.currentStatus)
		setAnimatedEdge(values.isAnimatedEdge)
		setPensState(values.showHandles)

		setEdgeColor(values.edgeColor)
		setNodeColor(values.nodeColor)
		setNodeTextColor(values.nodeTextColor)
		setHandlesBehavior(form.getValues('togglePens') as HandlesBehavior)
	}

	const statusLabels: Record<Status, string> = {
		[Status.INITIAL]: 'initial',
		[Status.LOADING]: 'loading',
		[Status.SUCCESS]: 'success',
		[Status.ERROR]: 'error'
	}

	return (
		<Card className={`p-6 ${className}`}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handlerUpdate)}
					className='space-y-6'
				>
					{/* Информация о дереве */}
					<section className='space-y-1'>
						<h2 className='text-xl font-bold'>{t('yourTree')}</h2>
						<p className='text-muted-foreground text-sm'>
							{t('nodeCount')}:{' '}
							<span className='font-medium'>{nodeCount}</span>
						</p>
						<p className='text-muted-foreground text-sm'>
							{t('edgeCount')}:{' '}
							<span className='font-medium'>{edgeCount}</span>
						</p>
					</section>

					{/* Вид */}
					<section className='space-y-3'>
						<h3 className='text-lg font-semibold'>
							{t('appearance')}
						</h3>

						{/* Цвет текста */}
						<FormField
							control={form.control}
							name='nodeTextColor'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('textColor')}</FormLabel>
									<FormControl>
										<Input
											type='color'
											{...field}
											className='h-10 w-full p-1'
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Цвет узлов */}
						<FormField
							control={form.control}
							name='nodeColor'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('nodeColor')}</FormLabel>
									<FormControl>
										<Input
											type='color'
											{...field}
											className='h-10 w-full p-1'
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Анимация узлов */}
						<FormField
							control={form.control}
							name='currentStatus'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('nodeView')}</FormLabel>
									<FormControl>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant='outline'
													className='w-full justify-start'
												>
													{t(
														`statusLabels.${statusLabels[field.value]}`
													)}
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className='w-full'>
												{Object.values(Status).map(
													status => (
														<DropdownMenuItem
															key={status}
															onClick={() =>
																field.onChange(
																	status
																)
															}
															className='w-full'
														>
															{t(
																`statusLabels.${statusLabels[status]}`
															)}
														</DropdownMenuItem>
													)
												)}
											</DropdownMenuContent>
										</DropdownMenu>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Чекбоксы для узлов */}
						<FormField
							control={form.control}
							name='nodeText'
							render={({ field }) => (
								<FormItem className='flex items-center gap-2'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={val =>
												field.onChange(Boolean(val))
											}
										/>
									</FormControl>
									<FormLabel>
										{t('changeTextColor')}
									</FormLabel>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='nodeColorCheckbox'
							render={({ field }) => (
								<FormItem className='flex items-center gap-2'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={val =>
												field.onChange(Boolean(val))
											}
										/>
									</FormControl>
									<FormLabel>
										{t('changeNodeColor')}
									</FormLabel>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='isAnimatedNode'
							render={({ field }) => (
								<FormItem className='flex items-center gap-2'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={val =>
												field.onChange(Boolean(val))
											}
										/>
									</FormControl>
									<FormLabel>
										{t('changeAnimatedNode')}
									</FormLabel>
								</FormItem>
							)}
						/>

						{/* Цвет веток */}
						<FormField
							control={form.control}
							name='edgeColor'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('edgeColor')}</FormLabel>
									<FormControl>
										<Input
											type='color'
											{...field}
											className='h-10 w-full p-1'
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='color'
							render={({ field }) => (
								<FormItem className='flex items-center gap-2'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={val =>
												field.onChange(Boolean(val))
											}
										/>
									</FormControl>
									<FormLabel>
										{t('changeEdgeColor')}
									</FormLabel>
								</FormItem>
							)}
						/>
						{/* Поведение ручек */}
						<FormField
							control={form.control}
							name='togglePens'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t('handles_behavior.title')}
									</FormLabel>
									<FormControl>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant={'outline'}
													className='w-full justify-start'
												>
													{t(`handles_behavior.${form.watch('togglePens')}`)}
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													onClick={() =>
														field.onChange(
															HandlesBehavior[
																'TOP-BOTTOM'
															]
														)
													}
												>
													{t(
														'handles_behavior.top-bottom'
													)}
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														field.onChange(
															HandlesBehavior.TOP
														)
													}
												>
													{t('handles_behavior.top')}
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Ручки */}
						<FormField
							control={form.control}
							name='showHandles'
							render={({ field }) => (
								<FormItem className='flex items-center gap-2'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={val =>
												field.onChange(Boolean(val))
											}
										/>
									</FormControl>
									<FormLabel>{t('showHandles')}</FormLabel>
								</FormItem>
							)}
						/>

						{/* Анимация веток */}
						<FormField
							control={form.control}
							name='isAnimatedEdge'
							render={({ field }) => (
								<FormItem className='flex items-center gap-2'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={val =>
												field.onChange(Boolean(val))
											}
										/>
									</FormControl>
									<FormLabel>
										{t('animateBranches')}
									</FormLabel>
								</FormItem>
							)}
						/>

						<Button type='submit'>{t('applyChanges')}</Button>
					</section>
				</form>
			</Form>
		</Card>
	)
}
