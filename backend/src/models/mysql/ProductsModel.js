import { withConnection, withTransaction } from '../../db/init.js'
import { randomUUID } from 'crypto'
import { normalizeString } from '../../Utils.js'
import { CategoryModel } from './CategoryModel.js'
import { BrandModel } from './BrandModel.js'
import { StockModel } from './StockModel.js'

export class ProductsModel {
  static async getAll({ category, brand, externalConnection = null }) {
    return withConnection(async (connection) => {
      const conditions = []
      const params = []

      if (category) {
        const cat = await CategoryModel.getByName({ name: category, externalConnection: connection })
        if (!cat) return false
        conditions.push("category_id = ?")
        params.push(cat.id)
      }

      if (brand) {
        const br = await BrandModel.getByName({ name: brand, externalConnection: connection })
        if (!br) return false
        conditions.push("brand_id = ?")
        params.push(br.id)
      }

      let query = "SELECT BIN_TO_UUID(id) id, name, price, image, category_id, brand_id FROM product"
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ")
      }

      const [rows] = await connection.query(query, params)
      return rows.length === 0 ? [] : rows
    }, externalConnection)
  }

  static async getById({ id, externalConnection = null }) {
    return withConnection(async (connection) => {
      const [rows] = await connection.query(
        "SELECT BIN_TO_UUID(id) id, name, price, image, category_id, brand_id FROM product WHERE id = UUID_TO_BIN(?)",
        [id]
      )
      return rows[0] ?? null
    }, externalConnection)
  }

  static async create({ input }) {
    return withTransaction(async (connection) => {
      const product_id = randomUUID()

      const category = await CategoryModel.getByName({ name: input.category, externalConnection: connection })
      if (!category) throw new Error(`Category ${input.category} not found`)

      const brand = await BrandModel.getByName({ name: input.brand, externalConnection: connection })
      if (!brand) throw new Error(`Brand ${input.brand} not found`)

      const [results] = await connection.query(
        `INSERT INTO product (id, name, price, image, category_id, brand_id) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?)`,
        [
          product_id,
          normalizeString(input.name),
          input.price,
          normalizeString(input.image),
          category.id,
          brand.id
        ]
      )

      if (results.affectedRows !== 1) {
        throw new Error('Error inserting the product')
      }

      for (const { size, quantity } of input.stock) {
        const stockResult = await StockModel.create({
          input: { product_id, size, quantity },
          externalConnection: connection
        })

        if (!stockResult) {
          throw new Error(`Error inserting stock for "${product_id}", size ${size}`)
        }
      }

      return await this.getById({ id: product_id, externalConnection: connection })
    })
  }

  static async update({ id, input, externalConnection = null }) {
    return withConnection(async (connection) => {
      const fields = Object.keys(input).map(f => `${f} = ?`).join(', ')
      const values = Object.values(input)

      const [result] = await connection.query(
        `UPDATE product SET ${fields} WHERE id = UUID_TO_BIN(?)`,
        [...values, id]
      )

      return result.affectedRows > 0
        ? await this.getById({ id, externalConnection: connection })
        : false
    }, externalConnection)
  }

  static async delete({ id, externalConnection = null }) {
    return withConnection(async (connection) => {
      const [result] = await connection.query(
        "DELETE FROM product WHERE id = UUID_TO_BIN(?)",
        [id]
      )
      return result.affectedRows > 0
    }, externalConnection)
  }
}
