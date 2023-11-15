import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { EXPERIMENTS } from './db'

const app = new Hono()

app.use('/*', cors())
app.get('/', (c) => c.text('Hello Hono!'))

app.get('/experiments', (c) => c.json(EXPERIMENTS)
)

export default app
