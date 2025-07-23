import { withConnection } from "../../db/init.js"
import { randomUUID } from "crypto"

export class OrderItemModel {
  static async getAll() {
    return await withConnection(async (connection) =>
      await connection.query(`
        SELECT 
          BIN_TO_UUID(id) AS id,
          BIN_TO_UUID(order_id) AS order_id,
          stock_id,
          price,
          quantity 
        FROM order_item
      `)
    )
  }

  static async getById({ id }) {
    return await withConnection(async (connection) => {
      const [rows] = await connection.query(`
        SELECT 
          BIN_TO_UUID(id) AS id,
          BIN_TO_UUID(order_id) AS order_id,
          stock_id,
          price,
          quantity 
        FROM order_item 
        WHERE id = UUID_TO_BIN(?)
      `, [id])
      return rows.length === 0 ? null : rows[0]
    })
  }

  static async create({ input }) {
    return await withConnection(async (connection) => {
      const id = randomUUID()
      const { order_id, ...rest } = input

      const fields = ['id', 'order_id', ...Object.keys(rest)]
      const placeholders = ['UUID_TO_BIN(?)', 'UUID_TO_BIN(?)', ...Object.keys(rest).map(() => '?')]
      const params = [id, order_id, ...Object.values(rest)]

      const sql = `
        INSERT INTO order_item (${fields.join(', ')})
        VALUES (${placeholders.join(', ')})
      `
      const [results] = await connection.query(sql, params)
      return results.affectedRows > 0 ? await this.getById({ id }) : false
    })
  }

  static async update({ id, input }) {
    return await withConnection(async (connection) => {
      const fields = []
      const params = []
      const { order_id, ...rest } = input

      if (order_id) {
        fields.push("order_id = UUID_TO_BIN(?)")
        params.push(order_id)
      }

      fields.push(...Object.keys(rest).map(k => `${k} = ?`))
      params.push(...Object.values(rest))
      params.push(id)

      const sql = `
        UPDATE order_item 
        SET ${fields.join(', ')} 
        WHERE id = UUID_TO_BIN(?)
      `
      const [results] = await connection.query(sql, params)
      return results.affectedRows > 0 ? await this.getById({ id }) : false
    })
  }

  static async delete({ id }) {
    return await withConnection(async (connection) => {
      const [results] = await connection.query(`
        DELETE FROM order_item WHERE id = UUID_TO_BIN(?)
      `, [id])
      return results.affectedRows !== 0
    })
  }
}
