import { api } from '@/shared/api'

class VerificationService {
	public async newVerification(token: string | null) {
		const response = await api.patch('api/auth/email-confirmation', { token })

		return response
	}

	public async newEmailVerification(token: string) {
		const response = await api.patch('api/auth/new-email/confirmation', { token })

		return response
	}
}

export const verificationService = new VerificationService()
