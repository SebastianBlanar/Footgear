import mysql from 'mysql2/promise'
import { readFile } from 'fs/promises'
import { resolvePath } from '../Utils.js'

let pool

export async function initDB() {
  if (pool) return pool

  pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3309,
    password: '',
    database: 'footgeardb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
  })

  const schemaPath = resolvePath(import.meta.url, '../../src/db/sql/schema.sql')
  const schemaSQL = await readFile(schemaPath, 'utf-8')
  const connection = await pool.getConnection()
  try {
    await connection.query(schemaSQL)
  } finally {
    connection.release()
  }

  return pool
}

export function getConnection() {
  if (!pool) throw new Error('La conexión no está inicializada. Ejecutá initDB primero.')
  return pool
}
