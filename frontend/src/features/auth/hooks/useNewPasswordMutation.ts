import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { passwordRecoveryService } from '../services/password-recovery.service'
import { TypeNewPasswordSchema } from '../schemes/new-password.schema'
import { useTranslation } from 'react-i18next'

export function useNewPasswordMutation() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { t } = useTranslation('auth')

	const token = searchParams.get('token')

	const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
		mutationKey: ['new password'],
		mutationFn: ({
			values
		}: {
			values: TypeNewPasswordSchema
		}) => passwordRecoveryService.new(values, token),
		onSuccess() {
			toast.success(t('auth-toast.password-changed'), {
				description: t('auth-toast.password-changed-description')
			})
			router.push('/dashboard/settings')
		},
		onError(error: any) {
			toastMessageHandler(error)
		}
	})

	return { newPassword, isLoadingNew }
}