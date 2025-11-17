'use client'

import { useMutation } from '@tanstack/react-query'
import { TFunction } from 'i18next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authService } from '@/features/auth/services'

import { toastMessageHandler } from '@/shared/utils'
import { pageConfig } from '@/shared/config'

export function useLogoutMutation(t: TFunction) {
	const router = useRouter()

	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			toast.success(t('auth-toast.logoutSuccess'))
			router.push(pageConfig.home)
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { logout, isLoadingLogout }
}
