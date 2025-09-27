import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeResetPasswordSchema } from '../schemes/reset-password.schema'
import { passwordRecoveryService } from '../services/password-recovery.service'
import { useTranslation } from 'react-i18next'

export function useResetPasswordMutation() {
	const { t } = useTranslation('auth')
	const { mutate: reset, isPending: isLoadingReset } = useMutation({
		mutationKey: ['reset password'],
		mutationFn: ({
			values
		}: {
			values: TypeResetPasswordSchema
		}) => passwordRecoveryService.reset(values),
		onSuccess() {
			toast.success(t('auth-toast.check-email'), {
				description: t('auth-toast.check-email-description')
			})
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { reset, isLoadingReset }
}
