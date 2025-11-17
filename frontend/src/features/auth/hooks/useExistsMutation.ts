import { useMutation } from '@tanstack/react-query'
import { TFunction } from 'next-i18next'
import { ResponseExists } from '../types/user.types'

import { authService } from '../services'
import { toast } from 'sonner'
import { toastMessageHandler } from '@/shared/utils'

export function useExistsMutation(t: TFunction, lang: string) {
	return useMutation({
		mutationKey: ['exists'],
		mutationFn: (token: string) => authService.fetchExistsInfo(token, lang),
		onSuccess(data: ResponseExists) {
			if (data?.email) {
				toast.message(
					t('accountWithEmailExists', { email: data.email })
				)
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
}
