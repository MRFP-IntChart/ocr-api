import express from 'express'
import multer, {StorageEngine} from 'multer'
import {tmpdir} from 'node:os'
import {v4 as uuid} from 'uuid'

import {bytesInMegabyte, fileIsPdf, getFileExt} from '../util/file.js'
import {HttpError} from '../error/index.js'


const maxFileSize: number = bytesInMegabyte * 100 // 100 MB

function fileFilter(
  _: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
): void {
  if (fileIsPdf(file)) {
    return cb(null, true)
  }
  cb(new HttpError(
    400,
    'Only PDF files are supported for text extraction.'
  ))
}

function filenameFunction(
  _: express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void
): void {
  const fileExt = getFileExt(file)
  return cb(null, `${uuid()}${fileExt}`)
}

const fileStorage: StorageEngine = multer.diskStorage(
  {
    destination: tmpdir(),
    filename: filenameFunction,
  }
)

function downloadFileToLocalFn(): express.RequestHandler {
  return multer({
    storage: fileStorage,
    limits: { fileSize: maxFileSize, files: 1 },
    fileFilter,
  }).single('file')
}

const downloadFileToLocal = downloadFileToLocalFn()

export async function fileProcessing(
  req: express.Request,
  res: express.Response,
): Promise<Express.Multer.File> {
  return new Promise((resolve, reject): void => {
    downloadFileToLocal(
      req,
      res,
      (err) => {
        if (err) {
          if (err?.code?.includes('FILE_SIZE')) {
            reject(new HttpError(400, 'The file you uploaded is too large'))
          } else {
            reject(err)
          }
        }
        if (!req.file) {
          reject(new HttpError(500, 'File could not be uploaded'))
          return
        }
        resolve(req.file)
      }
    )
  })
}
