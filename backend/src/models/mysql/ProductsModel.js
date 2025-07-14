import { getConnection } from '../../db/init.js'
import { randomUUID } from 'crypto'
import { normalizeString } from '../../Utils.js'
import { CategoryModel } from './CategoryModel.js'
import { BrandModel } from './BrandModel.js'

export class ProductsModel {
  static async getAll({ category, brand }) {
    const pool = getConnection()
    const connection = await pool.getConnection()

    try {
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
      if (!rows.length) return []

      return rows
    } finally {
      connection.release()
    }
  }

  static async getById({ id }) {
    const pool = getConnection()
    const connection = await pool.getConnection()
    try {
      const [rows] = await connection.query("SELECT BIN_TO_UUID(id) id, name, price, image, category_id, brand_id FROM product WHERE id = UUID_TO_BIN(?)", [id])
      return rows[0] ?? null
    }
    finally {
      connection.release()
    }
  }
  static async create({ input }) {
    const createProduct = async ({ input, connection }) => {
      const product_id = randomUUID()

      const category = await CategoryModel.getByName({ name: input.category })
      if (!category) throw new Error(`Category ${input.category} not found`)

      const brand = await BrandModel.getByName({ name: input.brand })
      if (!brand) throw new Error(`Brand ${input.brand} not found`)

      const [rows] = await connection.query(
        `INSERT INTO product (id, name, price, image, category_id, brand_id) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?)`,
        [product_id, normalizeString(input.name), input.price, normalizeString(input.image), category.id, brand.id]
      )

      if (rows.affectedRows !== 1) {
        throw new Error('Error inserting the product')
      }

      return {
        id: product_id,
        ...input
      }
    }

    const createProductVariant = async ({ input, product_id, connection }) => {
      const colors = Object.keys(input.stock)

      for (const color of colors) {
        const variant_id = randomUUID()

        const [variantResult] = await connection.query(
          "INSERT INTO product_variant (id, product_id, color) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?)",
          [variant_id, product_id, normalizeString(color)]
        )

        if (variantResult.affectedRows !== 1) {
          throw new Error(`Error inserting product_variant for color "${color}"`)
        }
        await createVariantStock({ input, color, variant_id, connection })
      }
    }

    const createVariantStock = async ({ input, color, variant_id, connection }) => {
      const stockItems = input.stock[color]

      for (const { size, quantity } of stockItems) {

        const [stockResult] = await connection.query(
          "INSERT INTO stock (variant_id, size, quantity) VALUES ( UUID_TO_BIN(?), ?, ?)",
          [variant_id, size, quantity]
        )

        if (stockResult.affectedRows !== 1) {
          throw new Error(`Error inserting stock for color "${color}", size ${size}`)
        }
      }
    }

    const pool = getConnection()
    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction()
      const newProduct = await createProduct({ input, connection })
      await createProductVariant({ input, product_id: newProduct.id, connection })
      return newProduct
    }
    catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  static async update({ id, input }) {
    const pool = getConnection()
    const connection = await pool.getConnection()
    try {
      const fields = Object.keys(input).map(f => `${f} = ?`).join(', ')
      const values = Object.values(input)
      const [result] = await connection.query(`UPDATE product SET ${fields} WHERE id = UUID_TO_BIN(?)`, [...values, id])
      if (result.affectedRows == 0) return false
      const [rows] = await connection.query("SELECT BIN_TO_UUID(id) id, name, price, image, category_id, brand_id FROM product WHERE id = UUID_TO_BIN(?)", [id])
      return rows[0] ?? null
    }
    finally {
      connection.release()
    }
  }
  static async delete({ id }) {
    const pool = getConnection()
    const connection = await pool.getConnection()
    try {
      const [result] = await connection.query("DELETE FROM product WHERE id = UUID_TO_BIN(?)", [id])
      if (result.affectedRows == 0) return false
      return true
    } finally {
      connection.release()
    }
  }
}

