import { api } from '@/shared/api'

import { TypeChangeEmailSchema } from '../../user/schemes/change-email-schema'
import { TypeLoginSchema, TypeRegisterSchema } from '../schemes'
import { ResponseExists, ResponseLoginData, ResponseRegisterData } from '../types/user.types'

class AuthService {
	public async register(body: TypeRegisterSchema) {

		const response = await api.post<ResponseRegisterData>('api/auth/register', body)

		return response
	}

	public async login(body: TypeLoginSchema) {
		console.log('login-test', process.env.SERVER_URL);
		
		const response = await api.post<ResponseLoginData>('api/auth/login', body)

		return response
	}

	public async oauthByProvider(provider: 'google' | 'yandex') {
		const response = await api.get<{ url: string }>(
			`api/oauth/connect/${provider}`
		)

		return response
	}

	public async fetchExistsInfo(token: string) {
		const response = await api.get<ResponseExists>(`api/oauth/exists-info?token=${token}`)

		return response
	}

	public async updateEmail(body: TypeChangeEmailSchema) {
		const response = await api.post(`/api/auth/update-email`, body)

		return response
	}

	public async logout() {
		const response = await api.post('api/auth/logout')

		return response
	}
}

export const authService = new AuthService()
