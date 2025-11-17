import { useMutation } from '@tanstack/react-query'

import { TypeRegisterSchema } from '../schemes'
import { authService } from '../services'
import { ResponseRegisterData } from '../types/user.types'
import { toastMessageHandler } from '@/shared/utils'
import { toast } from 'sonner'

export function useRegisterMutation() {
	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register user'],
		mutationFn: ({ values }: { values: TypeRegisterSchema }) =>
			authService.register(values),
		onSuccess(data: ResponseRegisterData) {
			toast.message(data.message)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { register, isLoadingRegister }
}
