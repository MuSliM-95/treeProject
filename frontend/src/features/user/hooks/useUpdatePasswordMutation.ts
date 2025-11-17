import { useMutation } from '@tanstack/react-query'

import { TypeChangePasswordSchema } from '../schemes/change-password-schema'
import { userService } from '../services'
import { IResponsePasswordUpdate } from '../types/user.types'


export function useUpdatePasswordMutation() {
	const { mutateAsync: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update password'],
		mutationFn: (data: TypeChangePasswordSchema) =>
			userService.updatePassword(data),
		onSuccess(data: IResponsePasswordUpdate) {},
		onError(error) {}
	})

	return { update, isLoadingUpdate }
}
