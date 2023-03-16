const userModel =`CREATE TABLE IF NOT EXISTS users (
    Id VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    CreatedAt DATE NOT NULL,
    UpdatedAt DATE NOT NULL,
    PRIMARY KEY (Id),
  UNIQUE KEY (Username),
  UNIQUE KEY (Email)
);`