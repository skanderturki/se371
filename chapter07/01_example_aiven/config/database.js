// import the sequelize library
const Sequelize = require('sequelize');

require('dotenv').config();

// create a configuration object
const sequelize = new Sequelize(
  process.env.DB_NAME,   //database name
  process.env.DB_USER,     // database user
  process.env.DB_PWD,  // user pwd
  {   
    // specify the database server used
    dialect: process.env.DB_DIALECT,

    // We are using a cloud-based mysql instance on aiven.io so host is 'mysql-se371-psu-7eaf.k.aivencloud.com'
    host: process.env.DB_HOST,

    // Communication port on the database server
    port: process.env.DB_PORT
  }
);

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Successfully connected to database server...`); 
  } catch(error) {
    console.log(error);
  }
}

// Export the sequelize object.  
module.exports = { sequelize, connectToDB };