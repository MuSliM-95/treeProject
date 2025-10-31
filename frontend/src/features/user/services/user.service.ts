import { api } from '@/shared/api'
import { TypeSettingsSchema } from '../schemes'
import { IDeleteProfile, IDeleteProfileResponse, IPasswordUpdate, IUser } from '@/features/auth/types'
import { TypeChangePasswordSchema } from '../schemes/change-password-schema'
import { TypeDeleteProfileSchema } from '../schemes/delete-profile-schema'


class UserService {
	public async findProfile() {
		const response = await api.get<IUser>('api/users/profile')		

		return response
	}

	public async updateProfile(body: TypeSettingsSchema) {
		const response = await api.patch<IUser>('api/users/profile-update', body)

		return response
	}
	public async updatePassword(body: TypeChangePasswordSchema) {
		const response = await api.patch<IPasswordUpdate>('api/auth/update-password', body)

		return response
	}
	public async profileDelete(body: TypeDeleteProfileSchema) {
		const response = await api.delete<IDeleteProfileResponse>('api/auth/delete-profile', body)

		return response
	}
}

export const userService = new UserService()
