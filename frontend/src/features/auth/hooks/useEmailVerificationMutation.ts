import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { verificationService } from '../services'

export function useEmailVerificationMutation() {
	const router = useRouter()
	const { t } = useTranslation('auth')

	const { mutate: verification, isPending } = useMutation({
		mutationKey: ['new-email'],
		mutationFn: (token: string) =>
			verificationService.newEmailVerification(token),
		onSuccess() {
			router.push('/dashboard/profile')
			toast.success(t('auth-toast.email-confirmed'))
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	return { verification, isPending }
}
