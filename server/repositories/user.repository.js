require('dotenv').config()

const pool = require('../configs/database.config');




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
const tableName = `users`;
// create a CRUD API for the users table
exports.getAllUser= async () => {
    const results = await query(`SELECT * FROM ${tableName}`);
    return results;
  },
  exports.getUser= async (username) => {

    const result = await query(`SELECT * FROM ${tableName} WHERE Username = ?`,username);
    return result;
  },
  exports.createUser= async (user) => {
    const result = await query(`INSERT INTO ${tableName} (Username, Email, Password, CreatedAt, UpdatedAt) VALUES (?)`, [user]);
   // INSERT INTO users (Username, Email, Password, CreatedAt, UpdatedAt) VALUES ('JohnDoe', 'johndoe@example.com', 'password123', '2022-03-07', '2022-03-07');


    return result;
  },
  exports.updateUser= async (user, username) => {
    const result =  await query(`UPDATE ${tableName} SET Username = ?, Email = ?, Password = ?, CreatedAt = ?, UpdatedAt = ? WHERE Username = ?`, [user, username]);
    return result;

  },
  exports.deleteUser= async (username) => {
    console.log(username);
    const result =   await query(`DELETE FROM ${tableName} WHERE Username = ?`, [username]);
    console.log(result);

    return result;

  }




