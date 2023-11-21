import { cors } from 'hono/cors'
import { EXPERIMENTS } from './db'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

const app = new OpenAPIHono()

const ExperimentSchema = z
  .object({
    id: z.string().openapi({ example: '123' }),
    name: z.string().openapi({ example: '123' }),
    description: z.string().optional().openapi({ example: 'short description' }),
    tags: z
      .array(
        z.object({
          name: z.string().openapi({ example: 'Vue' }),
          color: z.string().openapi({ example: 'red' }),
        }),
      )
      .optional(),
    group: z.object({
      id: z.string().openapi({ example: '1' }),
      name: z.string().openapi({ example: 'my group' }),
    }),
    parent: z.string().nullable().openapi({ example: 'my parent' }),
  })
  .openapi('Experiments')

const route = createRoute({
  method: 'get',
  path: '/experiments',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ExperimentSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
})

app.use('/*', cors())
app.get('/', (c) => c.text('Hello Hono!'))

app.openapi(route, (c) => {
  const experiments = EXPERIMENTS.map((experiment) => ({
    ...experiment,
    parent: experiment.parentId ? EXPERIMENTS.find((e) => e.id === experiment.parentId)?.name : null,
  }))
  return c.json(experiments)
})

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})
export default {
  port: 4001,
  fetch: app.fetch,
}
