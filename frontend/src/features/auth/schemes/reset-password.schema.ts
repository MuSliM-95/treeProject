import { z } from 'zod'
import { TFunction } from 'i18next'

export const ResetPasswordSchema = (t: TFunction) =>
	z.object({
		email: z.string().email({
			message: t('auth-errors.invalid-email')
		})
	})

export type TypeResetPasswordSchema = z.infer<
	ReturnType<typeof ResetPasswordSchema>
>
