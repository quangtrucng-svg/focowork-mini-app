const { pool } = require('../config/database');

class Employee {
    static async findAll() {
          const [rows] = await pool.query("SELECT * FROM employees WHERE is_active = true");
          return rows;
    }
    static async findById(id) {
          const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [id]);
          return rows[0];
    }
    static async findByZaloId(zaloUserId) {
          const [rows] = await pool.query("SELECT * FROM employees WHERE zalo_user_id = ?", [zaloUserId]);
          return rows[0];
    }
    static async create(data) {
          const [result] = await pool.query("INSERT INTO employees SET ?", [data]);
          return result.insertId;
    }
    static async update(id, data) {
          await pool.query("UPDATE employees SET ? WHERE id = ?", [data, id]);
          return this.findById(id);
    }
}

module.exports = Employee;
