import { TFunction } from 'next-i18next'
import { z } from 'zod'

export const createFeedbackSchema = (t: TFunction) =>
  z.object({
    treeCreated: z.enum(['yes', 'no'], {
      required_error: t('feedback-form.errors.treeRequired'),
    }),
    comment: z.string().min(10, {
      message: t('feedback-form.errors.commentTooShort'),
    }),
    contact: z
      .string()
      .email(t('feedback-form.errors.invalidEmail'))
      .optional()
      .or(z.literal('')),
  });


export type TypeFeedbackSchema = z.infer<ReturnType<typeof createFeedbackSchema>>;
