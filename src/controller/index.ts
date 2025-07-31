import express from 'express'
import fs from 'node:fs/promises'
// No TS types, so declared in /src/types/global.d.ts
import scribe from 'scribe.js-ocr'

import {addErrorHandlingToController} from '../error/index.js'
import {fileProcessing} from '../file/index.js'


async function pdfToText(req: express.Request, res: express.Response) {
  const file = await fileProcessing(req, res)
  const filePath = file.path
  const fileText = await scribe.extractText([filePath])
  // clean up new file
  await fs.unlink(filePath)
  res.send({text: fileText})
}

const methods = {
  pdfToText,
}

export default addErrorHandlingToController(methods)
