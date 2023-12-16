import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { roomRoutes } from './routes/room.routes'
import { airConditionerRoutes } from './routes/air-conditioner.routes'
import { appointmentRoutes } from './routes/appointment.routes'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())

app.use(roomRoutes)
app.use(airConditionerRoutes)
app.use(appointmentRoutes)
