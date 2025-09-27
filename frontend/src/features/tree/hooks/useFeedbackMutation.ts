import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeFeedbackSchema } from '../schemes'
import feedbackService from '../services/feedbackService'

export function useFeedbackMutation(
	setSubmitted: Dispatch<SetStateAction<boolean>>
) {
	const { mutate: sendMessage, isPending } = useMutation({
		mutationKey: ['sendMessage Telegram'],
		mutationFn: (values: TypeFeedbackSchema) =>
			feedbackService.sendFeedbackMessage(values),
		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
			}
			setSubmitted(true)
		},
		onError(error: any) {
			console.log(error);
			
			toastMessageHandler(error)
		}
	})

	return { sendMessage, isPending }
}
