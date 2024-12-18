## SQL script to generate users and databases



CREATE USER 'se371_1234'@'localhost' IDENTIFIED BY 'se371_1234pwd';

CREATE USER 'se371_2345'@'localhost' IDENTIFIED BY 'se371_2345pwd';

CREATE DATABASE se371_1234db;

CREATE DATABASE se371_2345db;

GRANT ALL PRIVILEGES ON se371_1234db.* TO 'se371_1234'@'localhost';

GRANT ALL PRIVILEGES ON se371_2345db.* TO 'se371_2345'@'localhost';

FLUSH PRIVILEGES;
