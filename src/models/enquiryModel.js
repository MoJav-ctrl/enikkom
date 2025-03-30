const db = require('../config/db');

class Enquiry {
  static async create({ name, email, phone, message }) {
    const [result] = await db.query(
      'INSERT INTO enquiries (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );
    return result;
  }
}

module.exports = Enquiry;
