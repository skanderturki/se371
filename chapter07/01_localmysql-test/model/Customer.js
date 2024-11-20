const db = require("../config/database");
const { DataTypes } = require('sequelize');

const Customer = db.sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    validate: {
      max: 100
    }
  },
  position: {
    type: DataTypes.STRING,
    defaultValue: "Developer"
  }
});

db.sequelize.sync();

module.exports = Customer;