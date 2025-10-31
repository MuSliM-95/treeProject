import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { toastMessageHandler } from '@/shared/utils'
import { TypeLoginSchema } from '../schemes'
import { authService } from '../services'

import { TFunction } from 'i18next'

export function useLoginMutation(
	setIsShowFactor: Dispatch<SetStateAction<boolean>>,
	t: TFunction
) {
	const router = useRouter()

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login user'],
		mutationFn: ({
			values
		}: {
			values: TypeLoginSchema
		}) => authService.login(values),
		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
				setIsShowFactor(true)
			} else {
				toast.success(t(`auth-toast.auth-success`))
				router.push('/dashboard/profile')
			}
		},
		onError(error: any) {							 	
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}
