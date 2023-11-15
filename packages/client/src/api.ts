import { z } from "zod";

const ExperimentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  tags: z.array(z.object({
    name: z.string(),
    color: z.string()
  })).optional(),
  group: z.object({
    id: z.string(),
    name: z.string()
  }).optional(),
  parent: z.string().optional()
})

export type Experiment = z.infer<typeof ExperimentSchema>

const API_URL = 'http://localhost:3000'

export const apiClient = {
  getExperiments: async () => {
    const response = await fetch(`${API_URL}/experiments`)
    const experiments = await response.json()
    return ExperimentSchema.array().parse(experiments)
  },
}
