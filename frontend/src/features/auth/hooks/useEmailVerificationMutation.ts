import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { pageConfig } from '@/shared/config'
import { toastMessageHandler } from '@/shared/utils'

import { verificationService } from '../services'

export function useEmailVerificationMutation() {
	const router = useRouter()
	const { t } = useTranslation('auth')

	const { mutate: verification, isPending } = useMutation({
		mutationKey: ['new-email'],
		mutationFn: (token: string) =>
			verificationService.newEmailVerification(token),
		onSuccess() {
			router.push(pageConfig.user.profile)
			toast.success(t('auth-toast.email-confirmed'))
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { verification, isPending }
}
