import { randomUUID } from "crypto"
import { withConnection, withTransaction } from "../../db/init.js"
import { CustomerModel } from "./CustomerModel.js"
import { OrderItemModel } from "./OrderItemModel.js"
import { StockModel } from "./StockModel.js"
import { ProductsModel } from "./ProductsModel.js"

export class OrderModel {
  static async getAll() {
    return withConnection(async (connection) => {
      const [rows] = await connection.query(`
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
      return rows
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
static async processPurchase({ input }) {
  return withTransaction(async (connection) => {
    const { name, email, address, phone, items, total_amount } = input
    
    //Validate price
    let subtotal = 0
    for (const item of items) {
      const { stock_id, quantity,price } = item
      const stock = await StockModel.getById({id : stock_id , externalConnection : connection})
      if(! stock) throw new Error("Stock not found")

      const product = await ProductsModel.getById({id : stock.product_id , externalConnection : connection})
      if(! product) throw new Error("Product not found")
      if(parseFloat(price) !== parseFloat(product.price)){
        throw new Error(`Invalid product price for product : ${product.id}. Expected ${product.price}, got ${price}`) 
      } 
      subtotal += (product.price * quantity)
    }
    if (subtotal.toFixed(2) !== parseFloat(total_amount).toFixed(2)){
      throw new Error(`Invalid total amount. Expected ${subtotal}, got ${total_amount}`);
    } 
    
    let customer = await CustomerModel.getByEmail({ email })

    if (!customer) {
      customer = await CustomerModel.create({ input: { name, email, address, phone }, connection })
      if (!customer) throw new Error('Error creating the customer')
    }

    const order = await this.create({ input: { customer_id: customer.id, total_amount }, connection })
    if (!order) throw new Error('Error creating the order')

    for (const item of items) {
      const { stock_id, quantity, price } = item

      const orderItem = await OrderItemModel.create({ input: { order_id: order.id, stock_id, quantity, price }, connection })
      if (!orderItem) throw new Error('Error creating the order item')

      const updatedStock = await StockModel.decrement({ stock_id: stock_id, quantity, connection })
      if (!updatedStock) throw new Error('Error updating the stock')

      }
      return order
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
