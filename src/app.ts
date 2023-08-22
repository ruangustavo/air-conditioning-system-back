import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { airConditionerRouter, appointmentRouter } from './routes'
import { errorHandler } from './middlewares'
import { roomRouter } from './routes/room.route'

export const app = express()

// Setting up middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
app.use(errorHandler)

// Setting up routes
app.use(airConditionerRouter)
app.use(roomRouter)
app.use(appointmentRouter)
