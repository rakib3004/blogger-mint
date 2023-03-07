
const { createPool } = require("mysql2");

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blogger'
});

module.exports = pool; 