import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeChangePasswordSchema } from '../schemes/change-password-schema'
import { userService } from '../services'

export function useUpdatePasswordMutation() {
	const { mutate: update, isPending: isLoadingUpdate, data } = useMutation({
		mutationKey: ['update password'],
		mutationFn: (data: TypeChangePasswordSchema) =>
			userService.updatePassword(data),
		onSuccess(data: any) {
			if (data?.messageTwo) {
				console.log(data);
				return toast.message(data?.messageTwo)
			}
			toast.success(data?.message)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate, data }
}
