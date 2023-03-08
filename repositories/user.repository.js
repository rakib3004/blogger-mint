"use strict";
const pool = require("../configs/database.config");
const UserDTO = require("../DTO/user.dto");

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
(exports.getAllUser = async () => {
  const results = await query(`SELECT * FROM ${tableName}`);
  const dtoResults = new UserDTO(results);
  return dtoResults;
}),

  (exports.createUser = async (user) => {
    const result = await query(
      `INSERT INTO ${tableName} (Id, Username, Email, Password, CreatedAt, UpdatedAt) VALUES (?)`,
      [user]
    );

    return result;
  }),

  (exports.getUserByUserName = async (username) => {
    const result = await query(
      `SELECT * FROM ${tableName} WHERE Username = ?`,
      [username]
    );
    const dtoResult = new UserDTO(result);
    return dtoResult;
  }),

  (exports.updateUserByUserName = async (Password, UpdatedAt, username) => {
    const result = await query(
      `UPDATE ${tableName} SET Password = ?, UpdatedAt = ? WHERE Username = ?`,
      [Password, UpdatedAt, username]
    );
    return result;
  }),

  (exports.deleteUserByUserName = async (username) => {
    const result = await query(`DELETE FROM ${tableName} WHERE Username = ?`, [
      username,
    ]);
    return result;
  });
