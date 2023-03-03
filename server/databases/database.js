const mysql = require('mysql2/promise');
const config = require('../configs/database.config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.database);
    const [results,] = await connection.execute(sql, params);
    return results;
}

module.exports = query;