import express from 'express'

import config from '../../config/index.js'

export const authHeaderProperty = 'authorization'

function authenticate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const authString = req.headers[authHeaderProperty]
  if (authString != config.secret) {
    res.status(401).send('You can only proceed if you know my secret')
    return
  }
  next()
}

export default authenticate
