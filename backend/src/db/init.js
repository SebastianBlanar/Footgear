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
export async function withConnection(callback, externalConnection = null) {
  if (externalConnection) {
    return await callback(externalConnection)
  }
  const pool = getConnection()
  const connection = await pool.getConnection()
  try {
    return await callback(connection)
  } finally {
    connection.release()
  }
}

export async function withTransaction(callback) {
  const pool = getConnection()
  const connection = await pool.getConnection()
  
  try {
    await connection.beginTransaction()

    const result = await callback(connection)

    await connection.commit()
    return result

  } catch (error) {
    await connection.rollback()
    throw error

  } finally {
    connection.release()
  }
}

