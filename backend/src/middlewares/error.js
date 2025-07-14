export const error = (err, req, res, next) => {
  console.error(err) // para debugging, solo en desarrollo
  res.status(500).json({ status: 'error', message: 'Internal Server Error' })
}