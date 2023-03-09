const databaseConfig = require("../configs/database.config");
const UserDTO = require("../DTO/user.dto");

 function query(sql, params) {
  return new Promise((resolve, reject) => {
    databaseConfig.db.query(sql, params, (error, results) => {
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
      `INSERT INTO ${tableName} (id, username, email, password, createdAt, updatedAt) VALUES (?)`,
      [user]
    );

    return result;
  }),

  (exports.getUserByUserName = async (username) => {
    const result = await query(
      `SELECT * FROM ${tableName} WHERE username = ?`,
      [username]
    );
    const dtoResult = new UserDTO(result);
    return dtoResult;
  }),

  (exports.updateUserByUserName = async (password, updatedAt, username) => {

    const result = await query(
      `UPDATE ${tableName} SET password = ?, updatedAt = ? WHERE username = ?`,
      [password, updatedAt, username]
    );
    return result;
  }),

  (exports.deleteUserByUserName = async (username) => {
    const result = await query(`DELETE FROM ${tableName} WHERE Username = ?`, [
      username,
    ]);
    return result;
  });
