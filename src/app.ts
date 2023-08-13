import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { airConditionerRouter, airConditionerStateRouter } from './routes'

export const app = express()

// Setting up middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())

// Setting up routes
app.use('/air-conditioners', airConditionerRouter)
app.use('/air-conditioners', airConditionerStateRouter)

export default app
