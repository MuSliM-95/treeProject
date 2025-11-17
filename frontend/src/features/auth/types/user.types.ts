export const  UserRole = {
	Regular: 'REGULAR',
	Admin: 'ADMIN'
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export const AuthMethod = {
	Credentials: 'CREDENTIALS',
	Google: 'GOOGLE',
	Yandex: 'YANDEX'
} as const


export type AuthMethod = (typeof AuthMethod)[keyof typeof AuthMethod]


export interface IAccount {
	id: string
	createdAt: string
	updatedAt: string
	type: string
	provider: string
	refreshToken: string
	accessToken: string
	expiresAt: number
	userId: string
}

export interface IUser {
	id: string
	createdAt: string
	updatedAt: string
	email: string
	password: string
	name: string
	picture: string
	role: UserRole
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: AuthMethod
	accounts: IAccount[]
}

export interface IPasswordUpdate {
	oldPassword: string,
	password: string,
	passwordRepeat: string
}

export interface IDeleteProfileResponse {
	needCode: boolean, 
	message: string
}

export interface IDeleteProfile {
	code?: string
}

export interface ResponseRegisterData {
	message: string
}

export type ResponseLoginData = { message: string } | { messageTwo: string }

export interface ResponseExists {
	email: string
}