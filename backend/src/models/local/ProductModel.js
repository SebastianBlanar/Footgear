import products from '../../data/products.json' with {type: 'json'}
import { randomUUID } from 'node:crypto'

export class ProductsModel {
  static async getAll({ category }) {
    if (category) {
      return products.filter((p) => p.category.toLowerCase() == category.toLowerCase())
    }
    return products
  }
  static async getById({ id }) {
    const product = products.find(p => p.id == id)
    return product
  }
  static async create({ input }) {
    const newProduct = {
      id: randomUUID(),
      ...input
    }
    products.push(newProduct)
    return newProduct
  }
  static async update({ id, input }) {
    const productIndex = products.findIndex((p) => p.id == id)
    if (productIndex < 0) return false
    const newProduct = {
      ...products[productIndex],
      ...input
    }
    products[productIndex] = newProduct
    return newProduct
  }
  static async delete({ id }) {
    const productIndex = products.findIndex(p => p.id == id)
    if (productIndex < 0) return false
    products.splice(productIndex, 1)
    return true
  }
}