import express from 'express'
import { connectDatabase } from './config/database.js'
import { ActivityModel } from './models/Activity.js'
import { LeaderboardModel } from './models/Leaderboard.js'
import { TeamModel } from './models/Team.js'
import { UserModel } from './models/User.js'
import { WorkoutModel } from './models/Workout.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const allowedFrontendOrigins = new Set([
  'http://localhost:5173',
  ...(codespaceName
    ? [`https://${codespaceName}-5173.app.github.dev`]
    : []),
])

app.use((request, response, next) => {
  const origin = request.get('origin')

  if (origin && allowedFrontendOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (request.method === 'OPTIONS') {
      response.sendStatus(204)
      return
    }
  }

  next()
})
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/users/', async (_request, response) => {
  response.json(await UserModel.find().lean())
})

app.get('/api/teams/', async (_request, response) => {
  response.json(await TeamModel.find().lean())
})

app.get('/api/activities/', async (_request, response) => {
  response.json(await ActivityModel.find().lean())
})

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await LeaderboardModel.find().sort({ rank: 1 }).lean())
})

app.get('/api/workouts/', async (_request, response) => {
  response.json(await WorkoutModel.find().lean())
})

async function startServer(): Promise<void> {
  await connectDatabase()
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${baseUrl}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error)
  process.exitCode = 1
})
