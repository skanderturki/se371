// import the sequelize library
const Sequelize = require('sequelize');

// create a configuration object
const sequelize = new Sequelize(
  process.env.MYSQL_DB,   //database name
  process.env.MYSQL_USER,     // database user
  process.env.MYSQL_PWD,  // user password
  {
    // specify the database server used
    dialect: 'mysql',

    // We are using a cloud-based mysql instance on aiven.io so host is 'mysql-se371-psu-7eaf.k.aivencloud.com'
    host: process.env.MYSQL_HOST,

    // Communication port on the database server
    port: process.env.MYSQL_PORT
  }
);

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Successfully connected to database server...`);
  } catch (error) {
    console.log(error);
  }
}

// Export the sequelize object.  
module.exports = { sequelize, connectToDB };