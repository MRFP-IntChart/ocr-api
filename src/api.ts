#!/user/bin/env node
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import router from './router/index.js'
import authenticate from './middleware/authenticate.js'
import config from '../config/index.js'


const api = express()

// only log if we arent running tests
if (!config.TESTING) {
  api.use(morgan('tiny'))
}
api.use(cors())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

api.use('', authenticate, router)

export default api
