import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { pageConfig } from '@/shared/config'
import { toastMessageHandler } from '@/shared/utils'

import { TypeNewPasswordSchema } from '../schemes/new-password.schema'
import { passwordRecoveryService } from '../services/password-recovery.service'

export function useNewPasswordMutation() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { t, i18n } = useTranslation('auth')

	const token = searchParams.get('token')

	const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
		mutationKey: ['new password'],
		mutationFn: ({ values }: { values: TypeNewPasswordSchema }) =>
			passwordRecoveryService.new(values, token),
		onSuccess() {
			toast.success(t('auth-toast.password-changed'), {
				description: t('auth-toast.password-changed-description')
			})
			router.push(pageConfig.user.setting)
		},
		async onError(error) {
			toastMessageHandler(error)
		}
	})

	return { newPassword, isLoadingNew }
}
