import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { authService } from '../../auth/services'
import { TypeChangeEmailSchema } from '../schemes/change-email-schema'

export function useEmailUpdateMutation(
	setIsShowFactor: Dispatch<SetStateAction<boolean>>,
	setOpen: Dispatch<SetStateAction<boolean>>,
	reset: any
) {
	const { mutate: updateEmail, isPending } = useMutation({
		mutationKey: ['email-update'],
		mutationFn: (data: TypeChangeEmailSchema) =>
			authService.updateEmail(data),
		onSuccess(data: any) {
			if (data?.messageTwo) {
				toast.message(data.messageTwo)
				return setIsShowFactor(true)
			}

			toast.success(data.message)
			setOpen(false)
			reset()
			setIsShowFactor(false)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { updateEmail, isPending }
}
