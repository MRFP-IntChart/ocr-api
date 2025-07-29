import express from 'express'

import {addErrorHandlingToController} from '../error/index.js'


async function pdfToText(req: express.Request, res: express.Response) {
  res.send('This is one way to add a body')
}

const methods = {
  pdfToText,
}

export default addErrorHandlingToController(methods)
