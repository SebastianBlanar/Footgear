import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export function getDirname(metaUrl) {
  return dirname(fileURLToPath(metaUrl))
}

export function resolvePath(metaUrl, relativePath) {
  const currentDir = getDirname(metaUrl)
  return join(currentDir, relativePath)
}

export const isValidUUID = (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)


export function normalizeString(str) {
  if (typeof str !== 'string') return false

  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}
export function validateNumber(number){
  const isValid = Number(number)
  if(isNaN(isValid)) return false
  return true 
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
