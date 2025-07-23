import { randomUUID } from "crypto"
import { withConnection } from "../../db/init.js"

export class OrderModel {
  static async getAll() {
    return withConnection(async (connection) => {
      return await connection.query(`
        SELECT 
          BIN_TO_UUID(id) AS id,
          BIN_TO_UUID(customer_id) AS customer_id,
          status,
          total_amount,
          payment_status,
          created_at,
          updated_at
        FROM orders
      `) 
    })
  }

  static async getById({ id }) {
    return withConnection(async (connection) => {
      const sql = `
        SELECT 
          BIN_TO_UUID(id) AS id,
          BIN_TO_UUID(customer_id) AS customer_id,
          status,
          total_amount,
          payment_status,
          created_at,
          updated_at
        FROM orders
        WHERE id = UUID_TO_BIN(?)
      `
      const [rows] = await connection.query(sql, [id])
      return rows.length === 0 ? null : rows[0]
    })
  }

  static async create({ input }) {
    return withConnection(async (connection) => {
      const id = randomUUID()
      const { customer_id, total_amount } = input
      const sql = `
        INSERT INTO orders (id, customer_id, total_amount)
        VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?)
      `
      const [result] = await connection.query(sql, [id, customer_id, total_amount])
      return result.affectedRows > 0 ? await this.getById({ id }) : false
    })
  }

  static async update({ id, input }) {
    return withConnection(async (connection) => {
      const params = []
      const fields = []
      const { customer_id, ...rest } = input

      if (customer_id) {
        params.push(customer_id)
        fields.push("customer_id = UUID_TO_BIN(?)")
      }

      const restKeys = Object.keys(rest)
      if (restKeys.length > 0) {
        params.push(...Object.values(rest))
        fields.push(...restKeys.map(k => `${k} = ?`))
      }
      params.push(id)

      const sql = `
        UPDATE orders
        SET ${fields.join(", ")}
        WHERE id = UUID_TO_BIN(?)
      `
      const [result] = await connection.query(sql, params)
      return result.affectedRows > 0 ? await this.getById({ id }) : false
    })
  }

  static async delete({ id }) {
    return withConnection(async (connection) => {
      const [result] = await connection.query(
        'DELETE FROM orders WHERE id = UUID_TO_BIN(?)',
        [id]
      )
      return result.affectedRows > 0
    })
  }
}
