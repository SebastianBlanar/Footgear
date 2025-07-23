import { getConnection, withConnection } from "../../db/init.js";

export class StockModel {
  static async getAll() {
    return withConnection(async (connection) => await connection.query("SELECT id, BIN_TO_UUID(product_id) product_id, size, quantity FROM stock"));
  }

  static async getById({ id }) {
    return withConnection(async (connection) => {
      const [rows] = await connection.query(
        "SELECT id, BIN_TO_UUID(product_id) product_id, size, quantity FROM stock WHERE id = ?",
        [id]
      );
      return rows.length === 0 ? null : rows[0];
    });
  }

  static async getByProductId({ id }) {
    return withConnection(async (connection) => {
      const sql = `
        SELECT stock.id, size, quantity, BIN_TO_UUID(product_id) product_id 
        FROM stock
        JOIN product ON stock.product_id = product.id 
        WHERE product_id = UUID_TO_BIN(?)
      `;
      const [rows] = await connection.query(sql, [id]);
      return rows.length === 0 ? null : rows;
    });
  }

  static async create({ input, externalConnection = null }) {
    let connection = externalConnection
    if(! externalConnection ){
      const pool = getConnection()
      connection = await pool.getConnection()
    }  
      const { product_id, ...rest } = input;
      const keys = ["product_id", ...Object.keys(rest)];
      const fields = keys.join(", ");
      const placeholders = ["UUID_TO_BIN(?)", ...Object.keys(rest).map(() => "?")].join(", ");
      const values = [product_id, ...Object.values(rest)];

      try {
        const sql = `INSERT INTO stock (${fields}) VALUES (${placeholders})`;
        const [results] = await connection.query(sql, values);
        return results.affectedRows !== 0 ? await this.getById({id : results.insertId}) : false
      } catch (err) {
        if (err.code === "ER_DUP_ENTRY") return false;
        throw err;
      } finally {
        if(! externalConnection ) connection.release() 
      }
    }

  static async update({ id, input }) {
    return withConnection(async (connection) => {
      const keys = Object.keys(input);
      const values = Object.values(input);
      const fields = keys.map((k) => `${k} = ?`).join(", ");
      const [results] = await connection.query(`UPDATE stock SET ${fields} WHERE id = ?`, [...values, id]);
      return results.affectedRows > 0 ? await this.getById({ id }) : false
    });
  }

  static async delete({ id }) {
    return withConnection(async (connection) => {
      const [results] = await connection.query("DELETE FROM stock WHERE id = ?", [id]);
      return results.affectedRows > 0;
    });
  }
}
