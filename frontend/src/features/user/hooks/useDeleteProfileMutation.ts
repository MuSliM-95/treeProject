import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { toastMessageHandler } from '@/shared/utils'
import { TypeDeleteProfileSchema } from '../schemes/delete-profile-schema'
import { userService } from '../services'
import { useRouter } from 'next/navigation'
import { IDeleteProfileResponse } from '@/features/auth/types'



export function useDeleteProfileMutation(
	setIsShowCode: Dispatch<SetStateAction<boolean>>
) {
	const router = useRouter()
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['delete profile'],
		mutationFn: (data: TypeDeleteProfileSchema) =>
			userService.profileDelete(data),
		onSuccess(data: IDeleteProfileResponse) {
			if (data.needCode) {
				setIsShowCode(true)
				return
			}
			setIsShowCode(false)
			router.push('/')
			toast.success(data?.message)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
