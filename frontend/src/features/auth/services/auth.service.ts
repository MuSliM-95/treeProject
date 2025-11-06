import { api } from '@/shared/api'
import { TypeLoginSchema, TypeRegisterSchema } from '../schemes'
import { IUser } from '../types/user.types'
import { TypeChangeEmailSchema } from '../../user/schemes/change-email-schema'


class AuthService {
	public async register(body: TypeRegisterSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>('api/auth/register', body, {
			headers
		})

		return response
	}

	public async login(body: TypeLoginSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>('api/auth/login', body, {
			headers
		})
		
		return response
	}

	public async oauthByProvider(provider: 'google' | 'yandex') {
		const response = await api.get<{ url: string }>(
			`api/oauth/connect/${provider}`
		)
	
		return response
	}

	public async fetchExistsInfo(token: string) {
		const response = await api.get(`api/oauth/exists-info?token=${token}`)

		return response
	}

	public async updateEmail(body: TypeChangeEmailSchema) {
		const response = await api.post(`api/auth/update-email`, body)

		return response
	}

	public async logout() {
		const response = await api.post('api/auth/logout')

		return response
	}
}

export const authService = new AuthService()
