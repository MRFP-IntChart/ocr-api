import path from 'node:path'

export const bytesInMegabyte = 1000 * 1000

export function getFileExt(file: Express.Multer.File): string {
  return path.extname(file.originalname).toLowerCase()
}

export function fileIsPdf(file: Express.Multer.File): boolean {
  return getFileExt(file) === '.pdf'
}
