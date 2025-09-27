import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { toastMessageHandler } from '@/shared/utils'
import { TypeLoginSchema } from '../schemes'
import { authService } from '../services'
import { useTranslation } from 'next-i18next'

export function useLoginMutation(
	setIsShowFactor: Dispatch<SetStateAction<boolean>>
) {
	const router = useRouter()
	const { t } = useTranslation('auth')

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
				router.push('/dashboard/settings')
			}
		},
		onError(error: any) {							 	
			toastMessageHandler(error)
		}
	})

	return { login, isLoadingLogin }
}
