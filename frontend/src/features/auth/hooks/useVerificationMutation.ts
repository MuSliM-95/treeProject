import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { verificationService } from '../services'
import { useTranslation } from 'react-i18next'
import { pageConfig } from '@/shared/config'
import { toast } from 'sonner'
import { toastMessageHandler } from '@/shared/utils'

export function useVerificationMutation() {
	const router = useRouter()
	const { t } = useTranslation('auth')
	
	const { mutate: verification, isPending } = useMutation({
		mutationKey: ['new-verification'],
		mutationFn: (token: string | null) =>
			verificationService.newVerification(token),
		onSuccess() {
			toast.success(t('auth-toast.email-confirmed'))
			router.push(pageConfig.user.setting)
		},
		onError(error) {
			toastMessageHandler(error)
			router.push(pageConfig.auth.login)
		}
	})

	return { verification, isPending }
}