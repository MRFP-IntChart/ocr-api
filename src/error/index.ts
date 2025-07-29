import express from 'express'

import {ControllerMethod} from '../router/types.js'


export class HttpError extends Error {
  public status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function handleControllerError(
  err: Error | HttpError,
  res: express.Response
): void {
  if (err instanceof HttpError) {
    res.status(err.status).send(err.message)
  } else {
    res.status(500).send('There was a server error. My bad.')
  }
}

export function addErrorHandlingToControllerMethod(
  controllerMethod: ControllerMethod
): ControllerMethod {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return controllerMethod(req, res, next).catch((e) => handleControllerError(e, res))
  }
}

export function addErrorHandlingToController<T extends {[key: string]: ControllerMethod}>(
  controller: T
): T {
  return Object.keys(controller).reduce(
    (
      // this is actually T, but TS has issues with that
      newController: any,
      key
    ) => {
      newController[key] = addErrorHandlingToControllerMethod(controller[key])
      return newController
    },
    {}
  )
}
