'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
	Button,
	Card,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Label,
	RadioGroup,
	RadioGroupItem,
	Textarea
} from '@/shared/components'

import { useFeedbackMutation } from '../../hooks'
import { TypeFeedbackSchema, createFeedbackSchema } from '../../schemes'

export function FeedbackForm() {
	const router = useRouter()
	const { t } = useTranslation('tree')
	const [submitted, setSubmitted] = useState(false)

	const schema = createFeedbackSchema(t)
	const { sendMessage } = useFeedbackMutation(setSubmitted)

	const form = useForm<TypeFeedbackSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			treeCreated: 'yes',
			comment: '',
			contact: ''
		}
	})

	const onSubmit = (data: TypeFeedbackSchema) => {
		sendMessage(data)
		form.reset()
	}

	if (submitted) {
		return (
			<Card className='mx-auto mt-6 w-full max-w-xl p-6 text-center'>
				<Button variant='ghost' onClick={() => router.back()}>
					← {t('feedback-form.back')}
				</Button>
				<h2 className='mb-2 text-xl font-semibold'>
					{t('feedback-form.thankYouTitle')}
				</h2>
				<p className='text-sm text-gray-500'>
					{t('feedback-form.thankYouText')}
				</p>
			</Card>
		)
	}

	return (
		<Card className='mx-auto mt-10 w-full max-w-xl p-6'>
			<Button
				onClick={() => router.back()}
				className='text-muted-foreground absolute top-4 left-4 text-sm hover:underline'
				variant='ghost'
			>
				← {t('feedback-form.back')}
			</Button>

			<div className='mb-6 text-center'>
				<h2 className='text-2xl font-bold'>
					{t('feedback-form.title')}
				</h2>
				<p className='text-sm text-gray-500'>
					{t('feedback-form.subtitle')}
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'
				>
					{/* Вопрос про дерево */}
					<FormField
						control={form.control}
						name='treeCreated'
						render={({ field }) => (
							<FormItem className='flex gap-4'>
								<FormLabel>
									{t('feedback-form.treeQuestion')}
								</FormLabel>
								<RadioGroup
									onValueChange={field.onChange}
									value={field.value}
									className='flex gap-4'
								>
									<RadioGroupItem value='yes' id='tree-yes' />
									<Label htmlFor='tree-yes'>
										{t('feedback-form.yes')}
									</Label>

									<RadioGroupItem value='no' id='tree-no' />
									<Label htmlFor='tree-no'>
										{t('feedback-form.no')}
									</Label>
								</RadioGroup>
							</FormItem>
						)}
					/>

					{/* Комментарий */}
					<FormField
						control={form.control}
						name='comment'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='comment'>
									{t('feedback-form.commentLabel')}
								</FormLabel>
								<FormControl>
									<Textarea
										id='comment'
										rows={4}
										placeholder={t(
											'feedback-form.commentPlaceholder'
										)}
										{...field}
									/>
								</FormControl>
								{form.formState.errors.comment && (
									<p className='text-sm text-red-500'>
										{form.formState.errors.comment.message}
									</p>
								)}
							</FormItem>
						)}
					/>

					{/* Контакт */}
					<FormField
						control={form.control}
						name='contact'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='contact'>
									{t('feedback-form.contactLabel')}
								</FormLabel>
								<FormControl>
									<Input
										id='contact'
										placeholder={t(
											'feedback-form.contactPlaceholder'
										)}
										{...field}
									/>
								</FormControl>
								{form.formState.errors.contact && (
									<p className='text-sm text-red-500'>
										{form.formState.errors.contact.message}
									</p>
								)}
							</FormItem>
						)}
					/>

					<Button type='submit' className='w-full'>
						{t('feedback-form.submit')}
					</Button>
				</form>
			</Form>
		</Card>
	)
}
