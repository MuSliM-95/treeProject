import { useMutation } from '@tanstack/react-query'
import { TFunction } from 'i18next'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { pageConfig } from '@/shared/config'
import { toastMessageHandler } from '@/shared/utils'

import { TypeLoginSchema } from '../schemes'
import { authService } from '../services'
import { ResponseLoginData } from '../types/user.types'

export function useLoginMutation(
	setIsShowFactor: Dispatch<SetStateAction<boolean>>,
	t: TFunction
) {
	const router = useRouter()

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login user'],
		mutationFn: ({ values }: { values: TypeLoginSchema }) =>
			authService.login(values),
		onSuccess(data: ResponseLoginData) {
			if ('messageTwo' in data) {
				toast.message(data.messageTwo)
				setIsShowFactor(true)
			}

			if ('message' in data) {
				toast.success(data.message)
				router.push(pageConfig.user.profile)
			}
		},
		async onError(error) {
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}
