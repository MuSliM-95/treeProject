import { z } from 'zod'
import { TFunction } from 'i18next'

export const RegisterSchema = (t: TFunction) =>
	z
		.object({
			name: z.string().min(1, {
				message: t('auth-errors.name-required')
			}),
			email: z.string().email({
				message: t('auth-errors.invalid-email')
			}),
			password: z.string().min(6, {
				message: t('auth-errors.password-min')
			}),
			passwordRepeat: z.string().min(6, {
				message: t('auth-errors.password-repeat-min')
			})
		})
		.refine(data => data.password === data.passwordRepeat, {
			message: t('auth-errors.passwords-not-match'),
			path: ['passwordRepeat']
		})

export type TypeRegisterSchema = z.infer<
	ReturnType<typeof RegisterSchema>
>
