import { z } from 'zod'

export const edgeSchema = z.object({
  color: z.string(),
  animated: z.boolean(),
})

// тип данных, которые пройдут валидацию
export type TypeEdgeSchema = z.infer<typeof edgeSchema>