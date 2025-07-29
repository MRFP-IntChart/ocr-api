import {Route, routerFactory} from './types.js'
import controller from '../controller/index.js'

const routes: Route[] = [
  {
    method: 'post',
    route: '/pdf_to_text',
    controllerMethod: controller.pdfToText
  }
]

export default routerFactory(routes)
