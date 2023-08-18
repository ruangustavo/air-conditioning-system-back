import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { airConditionerRouter, appointmentRouter, stateRouter } from './routes'
import { errorHandler } from './middlewares'

export const app = express()

// Setting up middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
app.use(errorHandler)

// Setting up routes
app.use('/air-conditioners', airConditionerRouter)
app.use('/air-conditioners', stateRouter)
app.use('/air-conditioners', appointmentRouter)

export default app
