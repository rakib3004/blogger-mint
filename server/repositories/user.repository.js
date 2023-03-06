const mysql = require('mysql2');

// create a pool of database connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blogger'
});

// create a function to query the database
function query(sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// create a CRUD API for the users table
const UserRepository = {
  getAllUser: async () => {
    const results = await query('SELECT * FROM users');
    return results;
  },
  getUser: async (id) => {
    const results = await query('SELECT * FROM users WHERE Id = ?', [id]);
    return results[0];
  },
  createUser: async (user) => {
    const results = await query('INSERT INTO users SET ?', [user]);
    return results.insertId;
  },
  updateUser: async (id, user) => {
    await query('UPDATE users SET ? WHERE Id = ?', [user, id]);
  },
  deleteUser: async (id) => {
    await query('DELETE FROM users WHERE Id = ?', [id]);
  }
};

module.exports = { UserRepository };