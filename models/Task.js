const { pool } = require('../config/database');

class Task {
    static async findAll(filters = {}) {
          let sql = "SELECT * FROM tasks WHERE 1=1";
          const params = [];
          if (filters.assignee_id) { sql += " AND assignee_id = ?"; params.push(filters.assignee_id); }
          if (filters.status) { sql += " AND status = ?"; params.push(filters.status); }
          sql += " ORDER BY created_at DESC";
          const [rows] = await pool.query(sql, params);
          return rows;
    }
    static async findById(id) {
          const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
          return rows[0];
    }
    static async create(data) {
          const [result] = await pool.query("INSERT INTO tasks SET ?", [data]);
          return result.insertId;
    }
    static async updateStatus(id, status) {
          await pool.query("UPDATE tasks SET status = ? WHERE id = ?", [status, id]);
          return this.findById(id);
    }
}

module.exports = Task;
