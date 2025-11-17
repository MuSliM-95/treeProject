'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useReactFlow } from '@xyflow/react'
import React, { useEffect } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
	Button,
	Card,
	Checkbox,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Label
} from '@/shared/components'

import { clearNodeEdge, sendEdge } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../hooks/useHooks'
import { TypeEdgeSchema, edgeSchema } from '../../schemes'

interface Props {
	edgeColor: string
}

export const EdgeForm: React.FC<Props> = ({ edgeColor }) => {
	const { setEdges } = useReactFlow()
	const dispatch = useAppDispatch()
	const { t } = useTranslation('tree')

	const edge = useAppSelector(state => state.tree.edge)

	useEffect(() => {
		form.setValue('animated', edge?.animated!)
	}, [edge])

	const form = useForm<TypeEdgeSchema>({
		resolver: zodResolver(edgeSchema),
		defaultValues: {
			color: edge?.style?.stroke || edgeColor,
			animated: edge?.animated
		}
	})

	const handleDeleteClick = () => {
		if (!edge) return
		setEdges(edges => edges.filter(edg => edg.id !== edge.id))
		dispatch(clearNodeEdge({}))
	}
	const handleUpdate = (data: TypeEdgeSchema) => {
		if (!edge) return
		const update = {
			...edge,
			animated: data.animated!,
			style: { ...edge.style, stroke: data.color || edge.style?.stroke! }
		}

		setEdges(edges => edges.map(edg => (edg.id === edge.id ? update : edg)))

		dispatch(
			sendEdge({
				data: update
			})
		)
	}

	const onInvalid = async (errors: FieldErrors<TypeEdgeSchema>) => {
		const { toast } = await import('sonner')
		if (errors.animated?.message) {
			toast.error(errors.animated?.message)
		}
		if (errors.color?.message) {
			toast.error(errors.color?.message)
		}
		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdate, onInvalid)}>
				<Card className='w-full space-y-4 p-6'>
					<h2 className='text-lg font-semibold'>
						{t('branchSettings.title')}
					</h2>

					<div className='flex items-center gap-4'>
						<Label>{t('branchSettings.id')}</Label>
						<div className='rounded bg-gray-100 p-1 font-mono text-sm'>
							{edge && edge.id.slice(0, 10) + '...'}
						</div>
					</div>

					<div className='flex items-center gap-4'>
						<Label>{t('branchSettings.source')}</Label>
						<div className='p-1'>{edge?.source}</div>
					</div>

					<div className='flex items-center gap-4'>
						<Label>{t('branchSettings.target')}</Label>
						<div className='p-1'>{edge?.target}</div>
					</div>

					<FormField
						name='color'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex items-center gap-4'>
								<FormLabel htmlFor='color'>
									{t('branchSettings.color')}
								</FormLabel>
								<FormControl>
									<Input
										id='color'
										type='color'
										disabled={!edge}
										{...field}
										className='p-1'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='animated'
						render={({ field }) => (
							<FormItem className='flex items-center gap-4'>
								<FormLabel htmlFor='animated'>
									{t('branchSettings.animated')}
								</FormLabel>
								<FormControl>
									<Checkbox
										id='animated'
										disabled={!edge}
										checked={field.value}
										onCheckedChange={(value: boolean) =>
											field.onChange(value === true)
										}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button className='mb-0' disabled={!edge} type='submit'>
						{t('applyChanges')}
					</Button>

					<Button
						onClick={handleDeleteClick}
						disabled={!edge}
						className='w-full bg-red-600'
					>
						{t('branchSettings.delete')}
					</Button>
				</Card>
			</form>
		</Form>
	)
}
