const express = require("express");

const router = express.Router();

const Customer = require('./model/Customer');

// Select all
router.get('/customers/v1/', async (request, response) => {
  const customers = await Customer.findAll();
  response.status(200).json({ customers: customers });
})

// Create
router.post('/customers/v1/', async (request, response) => {
  const { id, name, position } = request.body;
  const newCustomer = Customer.build({ "id": id, "name": name, "position": position });

  try {
    await newCustomer.save();
    response.status(201).json(newCustomer);
  } catch(error) {
    response.json(error);
  }
})

// Search by id
router.get('/customers/v1/:id', async (request, response) => {
  try {
    const customer = await Customer.findOne({ 
      where: {
        id: request.params.id
      }
    });
    response.status(200).json(customer);
  } catch (error) {
    response.json(error);
  }
})

// Search by position
router.get('/customers/v1/position/:position', async (request, response) => {
  try {
    const customer = await Customer.findAll({
      attributes: ['id', 'name'],
      where: {
        position: request.params.position
      }
    });
    response.status(200).json(customer);
  } catch (error) {
    response.json(error);
  }
})

// UPDATE
router.put('/customers/v1/:id', async (request, response) => {
  try {
    // find record by id
    const customer = await Customer.findOne({
      where: {
        id: request.params.id
      }
    });
    const { name, position } = request.body;
    // update local object
    customer.name = name;
    customer.position = position;
    // Save changes to DB
    await customer.save();
    response.status(200).json(customer);
  } catch (error) {
    response.json(error);
  }
})

// Delete record
router.delete('/customers/v1/:id', async(request, response) => {
  try {
    // find record by id
    const customer = await Customer.findOne({
      where: {
        id: request.params.id
      }
    });
    // delete it
    await customer.destroy();
    // send response
    response.status(200).json(customer);
  } catch (error) {
    response.json(error);
  }
})

module.exports = router;