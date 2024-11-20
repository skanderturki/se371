// import the sequelize library
const Sequelize = require('sequelize');

// create a configuration object
const sequelize = new Sequelize(
  'se371db',   //database name
  'se371',     // database user
  'se371pwd',  // user password
  {   
    // specify the database server used
    dialect: 'mysql',

    // We are using a local mysql instance so host is 'localhost'            
    host: 'localhost'
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