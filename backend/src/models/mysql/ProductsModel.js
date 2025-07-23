import { withConnection } from '../../db/init.js'
import { randomUUID } from 'crypto'
import { normalizeString } from '../../Utils.js'
import { CategoryModel } from './CategoryModel.js'
import { BrandModel } from './BrandModel.js'
import { StockModel } from './StockModel.js'

export class ProductsModel {
  static async getAll({ category, brand }) {
    return withConnection(async (connection) => {
      const conditions = []
      const params = []

      if (category) {
        const cat = await CategoryModel.getByName({ name: category })
        if (!cat) return false
        conditions.push("category_id = ?")
        params.push(cat.id)
      }

      if (brand) {
        const br = await BrandModel.getByName({ name: brand })
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
    })
  }

  static async getById({ id }) {
    return withConnection(async (connection) => {
      const [rows] = await connection.query(
        "SELECT BIN_TO_UUID(id) id, name, price, image, category_id, brand_id FROM product WHERE id = UUID_TO_BIN(?)",
        [id]
      )
      return rows[0] ?? null
    })
  }

  static async create({ input }) {
    return withConnection(async (connection) => {
      const product_id = randomUUID()
      
      const category = await CategoryModel.getByName({ name: input.category })
      if (!category) throw new Error(`Category ${input.category} not found`)

      const brand = await BrandModel.getByName({ name: input.brand })
      if (!brand) throw new Error(`Brand ${input.brand} not found`)

      await connection.beginTransaction()

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
        await connection.rollback()
        throw new Error('Error inserting the product')
      }

      for (const { size, quantity } of input.stock) {
        const stockResult = await StockModel.create({
          input: { product_id, size, quantity },
          externalConnection: connection
        })

        if (!stockResult) {
          await connection.rollback()
          throw new Error(`Error inserting stock for "${product_id}", size ${size}`)
        }
      }

      await connection.commit()

      return await this.getById({id : product_id})
    })
  }

  static async update({ id, input }) {
    return withConnection(async (connection) => {
      const fields = Object.keys(input).map(f => `${f} = ?`).join(', ')
      const values = Object.values(input)

      const [result] = await connection.query(
        `UPDATE product SET ${fields} WHERE id = UUID_TO_BIN(?)`,
        [...values, id]
      )

      return result.affectedRows > 0 ? await this.getById({id}) : false
    })
  }

  static async delete({ id }) {
    return withConnection(async (connection) => {
      const [result] = await connection.query(
        "DELETE FROM product WHERE id = UUID_TO_BIN(?)",
        [id]
      )
      return result.affectedRows > 0
    })
  }
}
