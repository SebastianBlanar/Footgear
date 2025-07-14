import { getConnection } from "../../db/init.js"
import { normalizeString } from "../../Utils.js"

export class BrandModel {
  static async getAll(){
    const pool = getConnection()
    const connection = await pool.getConnection()
    try {
      const [rows] = await connection.query("SELECT id,name FROM brand")
      if (rows.length == 0) return false
      return rows
    }
    finally { connection.release() }
  }
  static async getById({ id }) {
    const pool = getConnection()
    const connection = await pool.getConnection()
    try {
      const [rows] = await connection.query("SELECT id,name FROM brand WHERE id = ?", [id])
      if (rows.length == 0) return false
      return rows[0]
    }
    finally { connection.release() }
  }
  static async getByName({ name }) {
    const pool = getConnection()
    const connection = await pool.getConnection()
    try {
      const [rows] = await connection.query("SELECT id,name FROM brand WHERE name = ?", [normalizeString(name)])
      if (rows.length == 0) return false
      return rows[0]
    }
    finally { connection.release() }

  }
  static async create({ input }) {
    const pool = getConnection()
    const connection = await pool.getConnection()
    try {
      const [results] = await connection.query("INSERT INTO brand (name) VALUES (?)", [input.name])
      if (results.affectedRows == 0) return false

      const [rows] = await connection.query('SELECT id,name FROM brand WHERE id = ?', [results.insertId])
      if (rows.length == 0) return false

      return rows[0]

    } finally { connection.release() }
  }
  static async update({ id, input }) {
    const pool = getConnection()
    const connection = await pool.getConnection()
    try {
      const values = Object.values(input)
      const fields = Object.keys(input).map((k)=> `${k} = ?`).join(", ")
      const [results] = await connection.query(`UPDATE brand SET ${fields} WHERE id = ?`,[...values,id])
      if(results.affectedRows == 0) return false
      const [rows] = await connection.query('SELECT id,name FROM brand WHERE id = ?',[id])
      if(rows.length == 0) return false
      return rows[0]
    }
    finally { connection.release() }
  }
  static async delete({id}) { 
    const pool = getConnection()
    const connection = await pool.getConnection()
    try {
      const [results] = await connection.query('DELETE FROM brand WHERE id = ?',[id])
      if(results.affectedRows == 0) return false
      return true
    }
    finally{ connection.release()}
  }
}