const db = require('../config/db');

class Project {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM projects');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Project;
