import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Paths
export function getDirname(metaUrl) {
  return dirname(fileURLToPath(metaUrl))
}

export function resolvePath(metaUrl, relativePath) {
  const currentDir = getDirname(metaUrl)
  return join(currentDir, relativePath)
}

// Validations
export const isValidUUID = (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)


export function normalizeString(str) {
  if (typeof str !== 'string') return false

  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

// Errors
export const handleZodError = (result, res) => {
  return res.status(400).json({ message: JSON.parse(result.error.message) })
}
export const handleInvalidId = (res,uuid=false) => res.status(400).json({ error: `Id must be a numeric ${uuid ? "uuid" : ""}value` })


export const handleNotFound = (res, resource = 'Resource') => {
  return res.status(404).json({ error: `${resource} not found` })
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
