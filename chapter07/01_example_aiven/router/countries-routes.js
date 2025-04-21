const express = require("express");
const { Op } = require('sequelize');

const router = express.Router();

const Country = require('../model/Model').Country;

// Select all
router.get('/', async (request, response) => {
  const countries = await Country.findAll();
  response.status(200).json({ countries: countries });
})

// Create
router.post('/', async (request, response) => {
  const { name } = request.body;
  const newCountry = Country.build({ "name": name });

  try {
    await newCountry.save();
    response.status(201).json(newCountry);
  } catch (error) {
    response.json(error);
  }
})

module.exports = router;