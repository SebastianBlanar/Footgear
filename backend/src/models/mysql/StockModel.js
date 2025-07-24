import { getConnection, withConnection } from "../../db/init.js";

export class StockModel {
  static async getAll(externalConnection = null) {
    return withConnection(async (connection) => {
      const [rows] = await connection.query("SELECT id, BIN_TO_UUID(product_id) product_id, size, quantity FROM stock") 
      return rows
    },externalConnection);
  }

  static async getById({ id, externalConnection = null }) {
    return withConnection(async (connection) => {
      const [rows] = await connection.query(
        "SELECT id, BIN_TO_UUID(product_id) product_id, size, quantity FROM stock WHERE id = ?",
        [id]
      );
      return rows.length === 0 ? null : rows[0];
    }, externalConnection);
  }

  static async getByProductId({ id ,externalConnection = null}) {
    return withConnection(async (connection) => {
      const sql = `
        SELECT stock.id, size, quantity, BIN_TO_UUID(product_id) product_id 
        FROM stock
        JOIN product ON stock.product_id = product.id 
        WHERE product_id = UUID_TO_BIN(?)
      `;
      const [rows] = await connection.query(sql, [id]);
      return rows.length === 0 ? null : rows;
    },externalConnection);
  }
  static async create({ input, externalConnection = null }) {
    return withConnection(async (connection) => {
      const { product_id, ...rest } = input;
      const keys = ["product_id", ...Object.keys(rest)];
      const fields = keys.join(", ");
      const placeholders = ["UUID_TO_BIN(?)", ...Object.keys(rest).map(() => "?")].join(", ");
      const values = [product_id, ...Object.values(rest)];

      const sql = `INSERT INTO stock (${fields}) VALUES (${placeholders})`;
      const [results] = await connection.query(sql, values);
      return results.affectedRows !== 0
        ? await this.getById({ id: results.insertId, externalConnection: connection })
        : false;
    }, externalConnection);
  }

  static async decrement({ stock_id, quantity, connection }) {
    const stock = await this.getById({id : stock_id , externalConnection : connection})
    if (!stock) return null

    const newQuantity = stock.quantity - quantity
    if (newQuantity < 0) return null

    const [result] = await connection.query(
      'UPDATE stock SET quantity = ? WHERE id = ?',
      [newQuantity, stock_id]
    )

    if (result.affectedRows === 0) return null

    return { ...stock, quantity: newQuantity }
  }


  static async update({ id, input , externalConnection = null }) {
    return withConnection(async (connection) => {
      const keys = Object.keys(input);
      const values = Object.values(input);
      const fields = keys.map((k) => `${k} = ?`).join(", ");
      const [results] = await connection.query(`UPDATE stock SET ${fields} WHERE id = ?`, [...values, id]);
      return results.affectedRows > 0 ? await this.getById({ id }) : false
    },externalConnection);
  }

  static async delete({ id , externalConnection = null }) {
    return withConnection(async (connection) => {
      const [results] = await connection.query("DELETE FROM stock WHERE id = ?", [id]);
      return results.affectedRows > 0;
    },externalConnection);
  }
}
