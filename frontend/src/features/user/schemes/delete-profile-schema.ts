import { z } from 'zod'
import { TFunction } from 'i18next'

export const DeleteProfileSchema = (t: TFunction) =>
  z
    .object({
      code: z.optional(z.string())
    })


export type TypeDeleteProfileSchema = z.infer<ReturnType<typeof DeleteProfileSchema>>
