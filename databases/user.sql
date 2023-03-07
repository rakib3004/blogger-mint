CREATE TABLE IF NOT EXISTS users (
    Id INT NOT NULL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    CreatedAt DATE NOT NULL,
    UpdatedAt DATE NOT NULL
);