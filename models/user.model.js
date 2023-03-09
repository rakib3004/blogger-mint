require("dotenv").config();
const tableName = process.env.DATABASE_TABLE_NAME;

module.exports = {
  createTable: `CREATE TABLE IF NOT EXISTS ${tableName} (
        id VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt DATE NOT NULL,
        updatedAt DATE NOT NULL,
        PRIMARY KEY (id),
      UNIQUE KEY (username),
      UNIQUE KEY (email)
    );
    `,
};
