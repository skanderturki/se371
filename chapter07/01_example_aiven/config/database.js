// import the sequelize library
const Sequelize = require('sequelize');

// create a configuration object
const sequelize = new Sequelize(
  'myshop',   //database name
  'avnadmin',     // database user
  '',  // user pwd
  {   
    // specify the database server used
    dialect: 'mysql',

    // We are using a cloud-based mysql instance on aiven.io so host is 'mysql-se371-psu-7eaf.k.aivencloud.com'
    host: 'mysql-se371-psu-7eaf.k.aivencloud.com',

    // Communication port on the database server
    port: 26106
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