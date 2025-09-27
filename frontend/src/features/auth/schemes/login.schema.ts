import { z } from 'zod'
import { TFunction } from 'i18next'

export const LoginSchema = (t: TFunction) =>
	z.object({
		email: z.string().email({
			message: t('auth-errors.invalid-email')
		}),
		password: z.string().min(6, {
			message: t('auth-errors.password-min')
		}),
		code: z.optional(z.string())
	})

export type TypeLoginSchema = z.infer<ReturnType<typeof LoginSchema>>
