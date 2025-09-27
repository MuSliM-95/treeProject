import { TFunction } from 'i18next'
import { z } from 'zod'

export const NewPasswordSchema = (t: TFunction) =>
	z.object({
		password: z.string().min(6, {
			message: t('auth-errors.password-min')
		})
	})

export type TypeNewPasswordSchema = z.infer<
	ReturnType<typeof NewPasswordSchema>
>
