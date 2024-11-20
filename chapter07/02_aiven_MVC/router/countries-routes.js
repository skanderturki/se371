const express = require("express");
const { Op } = require('sequelize');

const { getAllCountries, createCountry } = require('../controller/countries-controller');

const router = express.Router();

const Country = require('../model/Model').Country;

// Select all
router.get('/v1/', getAllCountries)

// Create
router.post('/v1/', createCountry)

module.exports = router;