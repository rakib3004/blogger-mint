CREATE TABLE IF NOT EXISTS  (
    `uid` VARCHAR(40) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `body` VARCHAR(1023) NOT NULL,
    PRIMARY KEY(`uid`)
) ENGINE = InnoDB;