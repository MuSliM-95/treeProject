'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Position, useReactFlow } from '@xyflow/react'
import { useEffect } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid';

import {
	Button,
	Card,
	Checkbox,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input
} from '@/shared/components'

import { clearNodeEdge, sendNode } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../hooks/useHooks'
import { TypeLinksSchema, createLinksSchema } from '../../schemes'
import { TreeNode } from '../../types'

type Props = {
	selectedNode: TreeNode | null
	nodeColor: string
	nodeTextColor: string
	animatedEdge: boolean
}
export function NodeForm({
	selectedNode,
	nodeColor,
	nodeTextColor,
	animatedEdge
}: Props) {
	const dispatch = useAppDispatch()
	const { t } = useTranslation('tree')
	const nodesStatus = useAppSelector(state => state.tree.nodesStatus)

	const { addNodes, setNodes, setEdges, addEdges, getViewport } =
		useReactFlow()

	const schema = createLinksSchema(t)
	const form = useForm<TypeLinksSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			label: selectedNode?.data.label || 'default-node',
			imageUrl: '',
			bioUrl: '',
			posX: selectedNode?.position.x || 0,
			posY: selectedNode?.position.y || 0,
			clearBio: false,
			clearImg: false,
			bgColor: nodeColor || '#ffffff',
			nodeTextColor: nodeTextColor || '#000000',
			position: true
		}
	})

	useEffect(() => {
		if (selectedNode) {
			form.setValue('label', selectedNode.data.label)
			form.setValue('posX', selectedNode.position.x)
			form.setValue('posY', selectedNode.position.y)
			form.setValue(
				'bgColor',
				selectedNode.data?.style?.backgroundColor || '#ffffff'
			)
			form.setValue(
				'nodeTextColor',
				selectedNode.data?.style?.color || '#000000'
			)
		} else {
			form.reset()
		}
	}, [selectedNode])

	const handlerAddChildren = () => {
		if (!selectedNode) return
		const newNodeId = `node-${uuidv4()}`

		const node = {
			id: newNodeId,
			data: {
				label: 'Node children',
				status: selectedNode?.data.status,
				style: { ...selectedNode.data.style },
				img: null,
				bio: null
			},
			position: {
				x: selectedNode.position.x,
				y: selectedNode.position.y + 100
			},
			type: 'baseNode',
			sourcePosition: Position.Bottom,
			targetPosition: Position.Top
		}

		const edge = {
			id: `edge-${uuidv4()}`,
			source: selectedNode.id,
			target: newNodeId,
			type: 'default',
			animated: animatedEdge ?? false
		}

		addNodes(node)
		addEdges(edge)
	}

	const handleNodeSubmit = (data: TypeLinksSchema) => {
		const { x: panX, y: panY, zoom } = getViewport()
		// Берём центр окна браузера
		const screenCenterX = window.innerWidth / 2
		const screenCenterY = window.innerHeight / 2
		const node = {
			id: selectedNode?.id || `node-${uuidv4()}`,
			data: {
				...selectedNode?.data,
				label: data.label,
				status: selectedNode?.data.status || nodesStatus,
				style: {
					backgroundColor: data.bgColor,
					color: data.nodeTextColor
				},
				img: data.clearImg
					? ''
					: data.imageUrl || selectedNode?.data.img,
				bio: data.clearBio ? '' : data.bioUrl || selectedNode?.data.bio
			},
			position: {
				// Переводим координаты экрана в координаты канвы
				x: data.posX || (screenCenterX - panX) / zoom,
				y: data.posY || (screenCenterY - panY) / zoom
			},
			type: 'baseNode',
			sourcePosition: Position.Bottom,
			targetPosition: Position.Top
		}

		if (selectedNode) {
			setNodes(nodes =>
				nodes.map(n => (n.id === selectedNode.id ? node : n))
			)
			dispatch(sendNode({ data: node as TreeNode }))
		} else {
			addNodes(node)
		}

		form.reset()
	}

	const onInvalid = (errors: FieldErrors<TypeLinksSchema>) => {
		if (errors.imageUrl?.message) {
			toast.error(errors.imageUrl.message)
		}
		if (errors.bioUrl?.message) {
			toast.error(errors.bioUrl.message)
		}
		form.reset()
	}

	const handleDeleteClick = () => {
		if (selectedNode) {
			setNodes(nodes => nodes.filter(node => node.id !== selectedNode.id))
			setEdges(edges =>
				edges.filter(
					edge =>
						edge.source !== selectedNode.id &&
						edge.target !== selectedNode.id
				)
			)
			dispatch(clearNodeEdge({}))
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleNodeSubmit, onInvalid)}
				className='w-full'
			>
				<Card className='w-full gap-5 p-6'>
					<h2 className='text-lg font-semibold'>
						{t('settingsTitle')}
					</h2>

					<FormField
						control={form.control}
						name='label'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('nameLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('namePlaceholder')}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					{selectedNode && (
						<>
							<FormField
								control={form.control}
								name='imageUrl'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('imageLabel')}</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='https://example.com'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='bioUrl'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('bioLabel')}</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='https://example.com'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<div>
								<FormLabel>{t('delete_links')}</FormLabel>
								<div className='mt-2 flex gap-4'>
									<FormField
										control={form.control}
										name='clearImg'
										render={({ field }) => (
											<FormItem className='flex items-center'>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
													/>
												</FormControl>
												<FormLabel htmlFor='clear-img'>
													img
												</FormLabel>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='clearBio'
										render={({ field }) => (
											<FormItem className='flex items-center'>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
													/>
												</FormControl>
												<FormLabel htmlFor='clear-bio'>
													bio
												</FormLabel>
											</FormItem>
										)}
									/>
								</div>
							</div>

							<FormField
								control={form.control}
								name='nodeTextColor'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('textColor')}</FormLabel>
										<FormControl>
											<Input type='color' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='bgColor'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('nodeColor')}</FormLabel>
										<FormControl>
											<Input type='color' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</>
					)}

					<div className='flex gap-2'>
						<FormField
							control={form.control}
							name='posX'
							render={({ field }) => (
								<FormItem className='flex-1'>
									<FormLabel>{t('posX')}</FormLabel>
									<FormControl>
										<Input
											type='number'
											step='any'
											{...field}
											onChange={e =>
												field.onChange(
													e.target.valueAsNumber
												)
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='posY'
							render={({ field }) => (
								<FormItem className='flex-1'>
									<FormLabel>{t('posY')}</FormLabel>
									<FormControl>
										<Input
											type='number'
											step='any'
											{...field}
											onChange={e =>
												field.onChange(
													e.target.valueAsNumber
												)
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<Button
						variant={'ghost'}
						type='submit'
						className='w-full border'
					>
						{selectedNode ? t('applyChanges') : t('addNode')}
					</Button>

					{selectedNode && (
						<Button
							type='button'
							variant={'ghost'}
							onClick={handlerAddChildren}
							className='w-full border'
						>
							{t('addChild')}
						</Button>
					)}

					<Button
						type='button'
						onClick={handleDeleteClick}
						disabled={!selectedNode}
						className='w-full'
					>
						{t('deleteNode')}
					</Button>
				</Card>
			</form>
		</Form>
	)
}
