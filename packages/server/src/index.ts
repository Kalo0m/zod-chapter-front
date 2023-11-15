import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { EXPERIMENTS } from './db'

const app = new Hono()

app.use('/*', cors())
app.get('/', (c) => c.text('Hello Hono!'))

app.get('/experiments', (c) => {
  const experiments = EXPERIMENTS.map(experiment => ({
    ...experiment,
    parent: experiment.parentId ? EXPERIMENTS.find(e => e.id === experiment.parentId)?.name : null
  }))
  return c.json(experiments)
})

export default app
