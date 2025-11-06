import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { verificationService } from '../services'
import { useTranslation } from 'react-i18next'

export function useVerificationMutation() {
	const router = useRouter()
	const { t } = useTranslation('auth')
	
	const { mutate: verification } = useMutation({
		mutationKey: ['new-verification'],
		mutationFn: (token: string | null) =>
			verificationService.newVerification(token),
		onSuccess() {
			// router.push('/dashboard/settings')
			toast.success(t('auth-toast.email-confirmed'))
		},
		onError() {
			router.push('/auth/login')
		}
	})

	return { verification }
}