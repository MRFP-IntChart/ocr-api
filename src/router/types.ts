import express from 'express'


type HttpMethod = 'get' | 'post' | 'patch' | 'put' |'delete'

export type ControllerMethod = (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>

export type Route = {
  method: HttpMethod,
  route: string,
  controllerMethod: ControllerMethod
}

export function routerFactory(routes: Route[]): express.Router {
  const router = express.Router()
  for (let route of routes) {
    router[route.method](route.route, route.controllerMethod)
  }
  return router
}
