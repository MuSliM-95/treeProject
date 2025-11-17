import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeSettingsSchema } from '../schemes'
import { userService } from '../services'
import { TFunction } from 'next-i18next'

export function useUpdateProfileMutation(t: TFunction) {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeSettingsSchema) =>
			userService.updateProfile(data),
		onSuccess() {
			toast.success(t('profileUpdated'))
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
