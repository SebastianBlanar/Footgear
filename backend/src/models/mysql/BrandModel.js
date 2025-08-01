import { withConnection } from "../../db/init.js"
import { normalizeString } from "../../Utils.js"

export class BrandModel {
  static async getAll({ externalConnection = null } = {}) {
    return await withConnection(async (connection) => {
      const [rows] = await connection.query("SELECT id, name, image FROM brand")
      return rows
    }, externalConnection)
  }

  static async getById({ id, externalConnection = null }) {
    return await withConnection(async (connection) => {
      const [rows] = await connection.query("SELECT id, name, image FROM brand WHERE id = ?", [id])
      return rows.length === 0 ? null : rows[0]
    }, externalConnection)
  }

  static async getByName({ name, externalConnection = null }) {
    return await withConnection(async (connection) => {
      const [rows] = await connection.query("SELECT id, name, image FROM brand WHERE name = ?", [normalizeString(name)])
      return rows.length === 0 ? null : rows[0]
    }, externalConnection)
  }

  static async create({ input, externalConnection = null }) {
    return await withConnection(async (connection) => {
      const [results] = await connection.query(
        "INSERT INTO brand (name, image) VALUES (?, ?)",
        [input.name, input.image]
      )
      return results.affectedRows > 0 ? await this.getById({ id: results.insertId, externalConnection: connection }) : false
    }, externalConnection)
  }

  static async update({ id, input, externalConnection = null }) {
    return await withConnection(async (connection) => {
      const values = Object.values(input)
      const fields = Object.keys(input).map((k) => `${k} = ?`).join(", ")
      const [results] = await connection.query(
        `UPDATE brand SET ${fields} WHERE id = ?`,
        [...values, id]
      )
      return results.affectedRows > 0 ? await this.getById({ id, externalConnection: connection }) : false
    }, externalConnection)
  }

  static async delete({ id, externalConnection = null }) {
    return await withConnection(async (connection) => {
      const [results] = await connection.query("DELETE FROM brand WHERE id = ?", [id])
      return results.affectedRows !== 0
    }, externalConnection)
  }
}
