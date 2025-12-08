import { TFunction } from 'next-i18next'
import { z } from 'zod'

export const createLinksSchema = (t: TFunction) =>
	z.object({
		label: z.string(),
		imageUrl: z
			.string()
			.optional()
			.refine(val => !val || val.startsWith('https://'), {
				message: t('links.errors.mustStartWithHttps')
			}),
		bioUrl: z
			.string()
			.optional()
			.refine(val => !val || val.startsWith('https://'), {
				message: t('links.errors.mustStartWithHttps')
			}),
		posX: z.number().min(-3900).max(4100),
		posY: z.number().min(-1900).max(1700),
		clearImg: z.boolean(),
		clearBio: z.boolean(),
		bgColor: z.string(),
		nodeTextColor: z.string(),
		// sourcePosition: z.nativeEnum(Position),
		// targetPosition: z.nativeEnum(Position)
		position: z.boolean(),
		type: z.string()
	})

export type TypeLinksSchema = z.infer<ReturnType<typeof createLinksSchema>>
