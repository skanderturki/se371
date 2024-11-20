const express = require("express");
const { Op } = require('sequelize');

const router = express.Router();

const Employee = require('../model/Model').Employee;
const Country = require('../model/Model').Country;

// Select all
router.get('/v1/', async (request, response) => {
  const employees = await Employee.findAll();
  response.status(200).json({ employees: employees });
})

// Create
router.post('/v1/', async (request, response) => {
  const { id, name, position, age, city, countryId } = request.body;
  const newEmployee = Employee.build({ "id": id, "name": name, "position": position, "age": age, "city": city, "CountryId": countryId });

  try {
    await newEmployee.save();
    response.status(201).json(newEmployee);
  } catch (error) {
    response.json(error);
  }
})

// Search by id and get the country name using the one-to-many association
router.get('/v1/:id', async (request, response) => {
  try {
    const employee = await Employee.findOne({
      where: {
        id: request.params.id
      }
    });
    const country = await employee.getCountry();
    //console.log(country)
    response.status(200).json({ employee, country });
  } catch (error) {
    response.json(error);
  }
})

// Search by position and project on [id, name]
router.get('/v1/position/:position', async (request, response) => {
  try {
    const employee = await Employee.findAll({
      attributes: ['id', 'name'],
      where: {
        position: request.params.position
      }
    });
    response.status(200).json(employee);
  } catch (error) {
    response.json(error);
  }
})

// UPDATE
router.put('/v1/:id', async (request, response) => {
  try {
    // find record by id
    const employee = await Employee.findOne({
      where: {
        id: request.params.id
      }
    });
    const { name, position, city, age } = request.body;
    // update local object
    employee.name = name;
    employee.position = position;
    employee.city = city;
    employee.age = age;
    // Save changes to DB
    await employee.save();
    response.status(200).json(employee);
  } catch (error) {
    response.json(error);
  }
})

// Delete record
router.delete('/v1/:id', async (request, response) => {
  try {
    // find record by id
    const employee = await Employee.findOne({
      where: {
        id: request.params.id
      }
    });
    // delete it
    await employee.destroy();
    // send response
    response.status(200).json(employee);
  } catch (error) {
    response.json(error);
  }
})


// Search by position and city
router.get('/v1/position/:position/city/:city', async (request, response) => {
  try {
    const employee = await Employee.findAll({
      where: {
        [Op.and]: [{ city: request.params.city }, { position: request.params.position }]
      }
    });
    response.status(200).json(employee);
  } catch (error) {
    response.json(error);
  }
})

// Search by position or city
router.get('/v1/or/position/:position/city/:city', async (request, response) => {
  try {
    const employee = await Employee.findAll({
      where: {
        [Op.or]: [{ city: request.params.city }, { position: request.params.position }]
      }
    });
    response.status(200).json(employee);
  } catch (error) {
    response.json(error);
  }
})

// Delete all employees from a given city
router.delete('/v1/city/:city', async (request, response) => {
  try {
    // delete record in a given city
    const employee = await Employee.destroy({
      where: {
        city: request.params.city
      }
    });

    // send response
    response.status(200).json(employee);
  } catch (error) {
    response.json(error);
  }
})

// Find all employees from outside a given city
router.get('/v1/not/city/:city', async (request, response) => {
  try {
    const employee = await Employee.findAll({
      where: {
        city: {
          [Op.ne]: request.params.city
        }
      }
    });

    // send response
    response.status(200).json(employee);
  } catch (error) {
    response.json(error);
  }
})


// Find all employees with age less than a number
router.get('/v1/lt/age/:age', async (request, response) => {
  try {
    const employee = await Employee.findAll({
      where: {
        age: {
          [Op.lt]: request.params.age
        }
      }
    });

    // send response
    response.status(200).json(employee);
  } catch (error) {
    response.json(error);
  }
})

module.exports = router;