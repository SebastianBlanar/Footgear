import { withConnection } from "../../db/init.js"
import { normalizeString } from "../../Utils.js"

export class CategoryModel {
  static async getAll() {
    return await withConnection(async (connection) => await connection.query("SELECT id, name, image FROM category"))
  }

  static async getById({ id }) {
    return await withConnection(async (connection) => {
      const [rows] = await connection.query("SELECT id, name, image FROM category WHERE id = ?", [id])
      return rows.length === 0 ? null : rows[0]
    })
  }

  static async getByName({ name }) {
    return await withConnection(async (connection) => {
      const [rows] = await connection.query("SELECT id, name, image FROM category WHERE name = ?", [normalizeString(name)])
      return rows.length === 0 ? null : rows[0]
    })
  }

  static async create({ input }) {
    return await withConnection(async (connection) => {
      const [results] = await connection.query(
        "INSERT INTO category (name, image) VALUES (?, ?)",
        [input.name, input.image]
      )
      return results.affectedRows > 0 ? await this.getById({ id: results.insertId }) : false
    })
  }

  static async update({ id, input }) {
    return await withConnection(async (connection) => {
      const values = Object.values(input)
      const fields = Object.keys(input).map((k) => `${k} = ?`).join(", ")
      const [results] = await connection.query(
        `UPDATE category SET ${fields} WHERE id = ?`,
        [...values, id]
      )
      return results.affectedRows > 0 ? await this.getById({ id }) : false
    })
  }

  static async delete({ id }) {
    return await withConnection(async (connection) => {
      const [results] = await connection.query("DELETE FROM category WHERE id = ?", [id])
      return results.affectedRows !== 0
    })
  }
}
