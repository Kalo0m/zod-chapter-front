import { ZodAny, z } from 'zod'
const API_URL = 'http://localhost:3000'

const ExperimentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  tags: z
    .array(
      z.object({
        name: z.string(),
        color: z.string(),
      }),
    )
    .optional(),
  group: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional()
    .or(z.array(z.undefined()).transform((e) => (Array.isArray(e) ? undefined : e))),
  parent: z.string().nullable(),
})

export type Experiment = z.infer<typeof ExperimentSchema>

export const apiClient = {
  getExperiments: async () => {
    const response = await fetch(`${API_URL}/experiments`)
    const experiments = await response.json()
    return ExperimentSchema.array().parse(experiments)
  },
}
