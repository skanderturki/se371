// import the sequelize library
const Sequelize = require('sequelize');

// create a configuration object
const sequelize = new Sequelize(
  'myshop',   //database name
  'avnadmin',     // database user
  ??,  // user pwd
  {   
    // specify the database server used
    dialect: 'mysql',

    // We are using a local mysql instance so host is 'localhost'            
    host: 'mysql-se371-psu-7eaf.k.aivencloud.com',

    port: '26106'
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