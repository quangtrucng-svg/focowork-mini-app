const { pool } = require('../config/database');

class Company {
    static async findAll() {
          const [rows] = await pool.query("SELECT * FROM companies ORDER BY name");
          return rows;
    }
    static async findById(id) {
          const [rows] = await pool.query("SELECT * FROM companies WHERE id = ?", [id]);
          return rows[0];
    }
    static async findDepartments(companyId) {
          const [rows] = await pool.query("SELECT * FROM departments WHERE company_id = ?", [companyId]);
          return rows;
    }
    static async create(data) {
          const [result] = await pool.query("INSERT INTO companies SET ?", [data]);
          return result.insertId;
    }
}

module.exports = Company;
