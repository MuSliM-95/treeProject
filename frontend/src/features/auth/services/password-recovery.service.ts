import { api } from '@/shared/api'

import { TypeNewPasswordSchema } from '../schemes/new-password.schema'
import { TypeResetPasswordSchema } from '../schemes/reset-password.schema'
import { IUser } from '../types/user.types'

class PasswordRecoveryService {
	public async reset(body: TypeResetPasswordSchema) {
		const response = await api.post<IUser>('api/auth/reset-password', body)

		return response
	}

	public async new(body: TypeNewPasswordSchema, token: string | null) {
		const response = await api.post<IUser>(
			`api/auth/new-password/${token}`,
			body
		)

		return response
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
