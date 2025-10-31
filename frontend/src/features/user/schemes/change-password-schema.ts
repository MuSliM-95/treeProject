import { z } from 'zod'
import { TFunction } from 'i18next'

export const ChangePasswordSchema = (t: TFunction) =>
  z
    .object({
      oldPassword: z.string().min(1, {
        message: t('profile.auth-errors.current-password-required')
      }),
      password: z.string().min(6, {
        message: t('profile.auth-errors.password-min')
      }),
      passwordRepeat: z.string().min(6, {
        message: t('profile.auth-errors.confirm-password-required')
      }),

      code: z.optional(z.string())
    })
		.refine(data => data.password === data.passwordRepeat, {
			message: t('auth-errors.passwords-not-match'),
			path: ['passwordRepeat']
		})

export type TypeChangePasswordSchema = z.infer<ReturnType<typeof ChangePasswordSchema>>
