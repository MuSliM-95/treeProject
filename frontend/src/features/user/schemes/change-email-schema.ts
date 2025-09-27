import { z } from 'zod'
import { TFunction } from 'i18next'

export const ChangeEmailSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .email({ message: t('auth-errors.invalid-email') })
      .min(1, { message: t('auth-errors.email-required') }),
    
    code: z.optional(z.string())
  })

export type TypeChangeEmailSchema = z.infer<ReturnType<typeof ChangeEmailSchema>>
