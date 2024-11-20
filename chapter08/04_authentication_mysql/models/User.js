const db = require("../config/database");
const { DataTypes } = require('sequelize');

const User = db.sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

db.sequelize.sync({ alter: true });

module.exports = User;
