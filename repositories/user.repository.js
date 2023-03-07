'use strict'
const pool = require('../configs/database.config');
const UserDTO = require('../DTO/user.dto');



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
    const dtoResults = new UserDTO(results);
    return dtoResults;
  },
  exports.getUser= async (username) => {
    const result = await query(`SELECT * FROM ${tableName} WHERE Username = ?`,[username]);
    const dtoResult = new UserDTO(result);
    return dtoResult;
  },
  exports.createUser= async (user) => {
    const result = await query(`INSERT INTO ${tableName} (Id, Username, Email, Password, CreatedAt, UpdatedAt) VALUES (?)`, [user]);
   // INSERT INTO users (Username, Email, Password, CreatedAt, UpdatedAt) VALUES ('JohnDoe', 'johndoe@example.com', 'password123', '2022-03-07', '2022-03-07');
 
    return result;
  },

  exports.updateUser= async (Password, UpdatedAt,username) => {
    const result =  await query(`UPDATE ${tableName} SET Password = ?, UpdatedAt = ? WHERE Username = ?`, [Password, UpdatedAt,username]);
    return result;

  },
  exports.deleteUser= async (username) => {
    const result =   await query(`DELETE FROM ${tableName} WHERE Username = ?`, [username]);
    return result;

  }




