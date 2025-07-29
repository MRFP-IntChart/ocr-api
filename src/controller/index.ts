import express from 'express'

import {addErrorHandlingToController} from '../error'


async function pdfToText(req: express.Request, res: express.Response) {
  res.send('This is one way to add a body')
}

const methods = {
  pdfToText,
}

export default addErrorHandlingToController(methods)
