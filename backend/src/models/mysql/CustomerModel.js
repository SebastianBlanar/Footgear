import { randomUUID } from "crypto";
import { withConnection } from "../../db/init.js";

export class CustomerModel {
  static async getAll() {
    return withConnection(async (connection) => await connection.query("SELECT BIN_TO_UUID(id) id, name, email, address, phone FROM customer"))
  }

  static async getById({ id }) {
    return withConnection(async (connection) => {
      const [rows] = await connection.query(
        "SELECT BIN_TO_UUID(id) id, name, email, address, phone FROM customer WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return rows.length === 0 ? null : rows[0];
    });
  }

  static async create({ input }) {
    return withConnection(async (connection) => {
      const id = randomUUID();
      const fields = Object.keys(input).join(", ");
      const placeholders = Object.keys(input).map(() => "?").join(", ");
      const values = Object.values(input);

      const [results] = await connection.query(
        `INSERT INTO customer (id, ${fields}) VALUES (UUID_TO_BIN(?), ${placeholders})`,
        [id, ...values]
      );

      return results.affectedRows > 0 ? await this.getById({ id }) : false
    });
  }

  static async update({ id, input }) {
    return withConnection(async (connection) => {
      const fields = Object.keys(input)
        .map((f) => `${f} = ?`)
        .join(", ");
      const values = Object.values(input);

      const [results] = await connection.query(
        `UPDATE customer SET ${fields} WHERE id = UUID_TO_BIN(?)`,
        [...values, id]
      );

      return results.affectedRows > 0 ? await this.getById({ id }) : false
    });
  }

  static async delete({ id }) {
    return withConnection(async (connection) => {
      const [results] = await connection.query(
        "DELETE FROM customer WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return results.affectedRows > 0;
    });
  }
}
