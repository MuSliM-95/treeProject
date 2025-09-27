import { api } from '@/shared/api'
import { TypeResetPasswordSchema } from '../schemes/reset-password.schema'
import { IUser } from '../types/user.types'
import { TypeNewPasswordSchema } from '../schemes/new-password.schema'


class PasswordRecoveryService {
	public async reset(body: TypeResetPasswordSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>(
			'api/auth/reset-password',
			body,
			{
				headers
			}
		)

		return response
	}

	public async new(
		body: TypeNewPasswordSchema,
		token: string | null,
		recaptcha?: string
	) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>(
			`api/auth/new-password/${token}`,
			body,
			{
				headers
			}
		)

		return response
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
