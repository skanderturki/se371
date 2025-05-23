const db = require("../config/database");
const { DataTypes } = require('sequelize');

const Employee = db.sequelize.define('Employee', {
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
  },
  city: {
    type: DataTypes.STRING,
    validate: {
      max: 100
    }
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      min: 15,
      max: 120
    }
  }
});

const Country = db.sequelize.define('Country', {
  name: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  timestamps: false
});

Country.hasMany(Employee); // Employee will have a FK referencing a Country
Employee.belongsTo(Country);


db.sequelize.sync({ alter: true})
  .then(async () => {
    Country.count()
      .then(async function (count) {
        if( !count) {
          await Country.bulkCreate([
            { name: "KSA" },
            { name: "Oman" },
            { name: "Egypt" }
          ]);
        }
      });
  });

module.exports = { Employee, Country };