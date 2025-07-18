import { getConnection } from "../../db/init.js"

export class StockModel{
  static async getByProductId({id}){
    const pool = getConnection()
    const connection = await pool.getConnection()
    try {
      const sql = `SELECT size, quantity, BIN_TO_UUID(product_id) product_id FROM stock
      JOIN product ON stock.product_id = product.id WHERE product_id = UUID_TO_BIN(?)`
      const [rows] = await connection.query(sql,[id])
      if(rows.length == 0) return false 
      return rows
    }
    finally{ connection.release()}
  }
}